import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
import { CustomFieldDefinition } from '@prisma/client';
import { DocumentTemplate } from '../templates/template.types';

@Injectable()
export class CustomFieldsService {
  private readonly logger = new Logger(CustomFieldsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createDto: CreateCustomFieldDto): Promise<CustomFieldDefinition> {
    const existing = await this.prisma.customFieldDefinition.findUnique({
      where: { key: createDto.key },
    });

    if (existing) {
      throw new ConflictException({
        code: 'DUPLICATE_KEY',
        message: `Já existe um campo personalizado com a chave '${createDto.key}'`,
      });
    }

    const field = await this.prisma.customFieldDefinition.create({
      data: {
        key: createDto.key,
        label: createDto.label,
        type: createDto.type,
        inputMode: createDto.inputMode,
        validation: createDto.validation || null,
        formatting: createDto.formatting || null,
      },
    });

    this.logger.log(`Created custom field definition: ${field.key} (${field.id})`);
    return field;
  }

  async findAll(): Promise<CustomFieldDefinition[]> {
    return this.prisma.customFieldDefinition.findMany({
      orderBy: { key: 'asc' },
    });
  }

  async findById(id: string): Promise<CustomFieldDefinition> {
    const field = await this.prisma.customFieldDefinition.findUnique({
      where: { id },
    });

    if (!field) {
      throw new NotFoundException({
        code: 'CUSTOM_FIELD_NOT_FOUND',
        message: 'Campo personalizado não encontrado',
      });
    }

    return field;
  }

  async update(
    id: string,
    updateDto: UpdateCustomFieldDto,
  ): Promise<CustomFieldDefinition> {
    await this.findById(id);

    const updated = await this.prisma.customFieldDefinition.update({
      where: { id },
      data: {
        ...(updateDto.label ? { label: updateDto.label } : {}),
        ...(updateDto.type ? { type: updateDto.type } : {}),
        ...(updateDto.inputMode ? { inputMode: updateDto.inputMode } : {}),
        ...(updateDto.validation !== undefined ? { validation: updateDto.validation } : {}),
        ...(updateDto.formatting !== undefined ? { formatting: updateDto.formatting } : {}),
      },
    });

    this.logger.log(`Updated custom field: ${id}`);
    return updated;
  }

  async delete(id: string): Promise<void> {
    const field = await this.findById(id);

    // Section 39: Check if used by any PUBLISHED version
    const publishedVersions = await this.prisma.documentVersion.findMany({
      where: { status: 'PUBLISHED' },
    });

    for (const version of publishedVersions) {
      const template = version.template as unknown as DocumentTemplate;
      if (template && Array.isArray(template.pages)) {
        for (const page of template.pages) {
          if (Array.isArray(page.fields)) {
            const hasField = page.fields.some((f) => f.key === field.key);
            if (hasField) {
              throw new ConflictException({
                code: 'FIELD_IN_USE',
                message: `Não é possível excluir o campo personalizado '${field.key}', pois está sendo utilizado pela versão ${version.versionNumber} (publicada) de um documento.`,
              });
            }
          }
        }
      }
    }

    await this.prisma.customFieldDefinition.delete({
      where: { id },
    });

    this.logger.log(`Deleted custom field: ${field.key} (${id})`);
  }
}
