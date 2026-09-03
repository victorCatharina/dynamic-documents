import {
  Injectable,
  NotFoundException,
  ConflictException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TemplateValidatorService } from '../templates/template-validator.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { DocumentVersion } from '@prisma/client';
import { DocumentTemplate } from '../templates/template.types';

@Injectable()
export class DocumentVersionsService {
  private readonly logger = new Logger(DocumentVersionsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly templateValidator: TemplateValidatorService,
  ) {}

  getDefaultTemplate(): DocumentTemplate {
    return {
      page: {
        size: 'A4',
        orientation: 'PORTRAIT',
        margins: { top: 36, bottom: 36, left: 36, right: 36 },
      },
      pages: [
        {
          number: 1,
          fields: [],
        },
      ],
    };
  }

  async createVersion(
    documentId: string,
    createDto: CreateVersionDto,
  ): Promise<DocumentVersion> {
    const document = await this.prisma.document.findFirst({
      where: { id: documentId, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException({
        code: 'DOCUMENT_NOT_FOUND',
        message: 'Documento não encontrado',
      });
    }

    // Get max versionNumber for this document
    const latestVersion = await this.prisma.documentVersion.findFirst({
      where: { documentId },
      orderBy: { versionNumber: 'desc' },
    });

    const nextVersionNumber = latestVersion ? latestVersion.versionNumber + 1 : 1;

    let initialTemplate: any = this.getDefaultTemplate();

    if (createDto.sourceVersionId) {
      const sourceVersion = await this.prisma.documentVersion.findUnique({
        where: { id: createDto.sourceVersionId },
      });
      if (sourceVersion) {
        initialTemplate = sourceVersion.template;
      }
    } else if (createDto.template) {
      initialTemplate = createDto.template;
    }

    const version = await this.prisma.documentVersion.create({
      data: {
        documentId,
        versionNumber: nextVersionNumber,
        status: 'DRAFT',
        template: JSON.stringify(initialTemplate),
      },
    });

    this.logger.log(
      `Created version ${nextVersionNumber} (ID: ${version.id}) for document ${documentId}`,
    );
    return version;
  }

  async findAllByDocument(documentId: string): Promise<DocumentVersion[]> {
    const document = await this.prisma.document.findFirst({
      where: { id: documentId, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException({
        code: 'DOCUMENT_NOT_FOUND',
        message: 'Documento não encontrado',
      });
    }

    return this.prisma.documentVersion.findMany({
      where: { documentId },
      orderBy: { versionNumber: 'desc' },
    });
  }

  async findById(documentId: string, versionId: string): Promise<DocumentVersion> {
    const version = await this.prisma.documentVersion.findFirst({
      where: { id: versionId, documentId },
    });

    if (!version) {
      throw new NotFoundException({
        code: 'VERSION_NOT_FOUND',
        message: 'Versão do documento não encontrada',
      });
    }

    return version;
  }

  async updateVersion(
    documentId: string,
    versionId: string,
    updateDto: UpdateVersionDto,
  ): Promise<DocumentVersion> {
    const version = await this.findById(documentId, versionId);

    // Critical Invariant: Published versions cannot be altered (Section 10 & 28)
    if (version.status === 'PUBLISHED') {
      throw new ConflictException({
        code: 'VERSION_IMMUTABLE',
        message:
          'Uma versão publicada não pode ser alterada. Crie uma nova versão para realizar modificações.',
      });
    }

    if (version.status === 'ARCHIVED') {
      throw new ConflictException({
        code: 'VERSION_ARCHIVED',
        message: 'Uma versão arquivada não pode ser editada.',
      });
    }

    // Validate template structure
    this.templateValidator.validateOrThrow(updateDto.template);

    const updated = await this.prisma.documentVersion.update({
      where: { id: versionId },
      data: {
        template: updateDto.template,
      },
    });

    this.logger.log(`Updated version draft ${versionId} for document ${documentId}`);
    return updated;
  }

  async publishVersion(
    documentId: string,
    versionId: string,
  ): Promise<DocumentVersion> {
    const version = await this.findById(documentId, versionId);

    if (version.status === 'PUBLISHED') {
      return version; // already published
    }

    // Validate template before publishing
    this.templateValidator.validateOrThrow(version.template);

    // Atomically archive previous published versions and publish this version
    const [publishedVersion] = await this.prisma.$transaction([
      this.prisma.documentVersion.update({
        where: { id: versionId },
        data: {
          status: 'PUBLISHED',
          publishedAt: new Date(),
        },
      }),
      this.prisma.documentVersion.updateMany({
        where: {
          documentId,
          status: 'PUBLISHED',
          id: { not: versionId },
        },
        data: {
          status: 'ARCHIVED',
        },
      }),
      this.prisma.document.update({
        where: { id: documentId },
        data: {
          status: 'PUBLISHED',
          publishedVersionId: versionId,
        },
      }),
    ]);

    this.logger.log(
      `Published version ${version.versionNumber} (ID: ${versionId}) for document ${documentId}`,
    );
    return publishedVersion;
  }
}
