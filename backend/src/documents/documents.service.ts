import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DocumentVersionsService } from '../document-versions/document-versions.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { QueryDocumentsDto } from './dto/query-documents.dto';
import { Document, Prisma } from '@prisma/client';
import * as crypto from 'crypto';
import { DocumentTemplate } from '../templates/template.types';

@Injectable()
export class DocumentsService {
  private readonly logger = new Logger(DocumentsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly versionsService: DocumentVersionsService,
  ) {}

  private generatePublicToken(): string {
    return crypto.randomBytes(16).toString('hex');
  }

  async create(createDto: CreateDocumentDto, userId?: string): Promise<Document> {
    const publicToken = this.generatePublicToken();

    const document = await this.prisma.document.create({
      data: {
        name: createDto.name,
        description: createDto.description,
        status: 'DRAFT',
        publicToken,
        createdById: userId || null,
      },
    });

    // Automatically create initial version 1 (Section 24 & 27)
    await this.versionsService.createVersion(document.id, {
      template: this.versionsService.getDefaultTemplate(),
    });

    this.logger.log(`Created document: ${document.id} (${document.name})`);
    return this.findById(document.id);
  }

  async findAll(query: QueryDocumentsDto) {
    const page = query.page || 1;
    const limit = query.limit || 20;
    const skip = (page - 1) * limit;

    const where: Prisma.DocumentWhereInput = {
      deletedAt: null,
      ...(query.status ? { status: query.status } : {}),
      ...(query.search
        ? {
            OR: [
              { name: { contains: query.search } },
              { description: { contains: query.search } },
            ],
          }
        : {}),
    };

    const [total, data] = await Promise.all([
      this.prisma.document.count({ where }),
      this.prisma.document.findMany({
        where,
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          versions: {
            select: {
              id: true,
              versionNumber: true,
              status: true,
              publishedAt: true,
              createdAt: true,
            },
            orderBy: { versionNumber: 'desc' },
          },
        },
      }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findById(id: string): Promise<Document> {
    const document = await this.prisma.document.findFirst({
      where: { id, deletedAt: null },
      include: {
        versions: {
          orderBy: { versionNumber: 'desc' },
        },
      },
    });

    if (!document) {
      throw new NotFoundException({
        code: 'DOCUMENT_NOT_FOUND',
        message: 'Documento não encontrado',
      });
    }

    return document;
  }

  async update(id: string, updateDto: UpdateDocumentDto): Promise<Document> {
    await this.findById(id);

    const updated = await this.prisma.document.update({
      where: { id },
      data: {
        ...(updateDto.name ? { name: updateDto.name } : {}),
        ...(updateDto.description !== undefined ? { description: updateDto.description } : {}),
      },
    });

    this.logger.log(`Updated document metadata: ${id}`);
    return this.findById(id);
  }

  async delete(id: string): Promise<void> {
    await this.findById(id);

    await this.prisma.document.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    this.logger.log(`Soft deleted document: ${id}`);
  }

  async getSchema(documentId: string) {
    const document = await this.findById(documentId);

    // Look for published version first, otherwise latest version
    let targetVersion = null;
    if (document.publishedVersionId) {
      targetVersion = await this.prisma.documentVersion.findUnique({
        where: { id: document.publishedVersionId },
      });
    }

    if (!targetVersion) {
      targetVersion = await this.prisma.documentVersion.findFirst({
        where: { documentId },
        orderBy: { versionNumber: 'desc' },
      });
    }

    if (!targetVersion) {
      throw new NotFoundException({
        code: 'NO_VERSION_AVAILABLE',
        message: 'O documento não possui nenhuma versão disponível para extração de schema',
      });
    }

    const template = targetVersion.template as unknown as DocumentTemplate;
    const fieldsList: any[] = [];

    if (template && Array.isArray(template.pages)) {
      template.pages.forEach((page) => {
        if (Array.isArray(page.fields)) {
          page.fields.forEach((field) => {
            fieldsList.push({
              id: field.id,
              key: field.key,
              label: field.label || field.key,
              type: field.type,
              inputMode: field.inputMode || 'MANUAL',
              required: Boolean(field.validation?.required),
              validation: field.validation || {},
              mask: field.mask || null,
              pageNumber: page.number,
            });
          });
        }
      });
    }

    return {
      documentId: document.id,
      documentName: document.name,
      version: targetVersion.versionNumber,
      versionId: targetVersion.id,
      versionStatus: targetVersion.status,
      fields: fieldsList,
    };
  }
}
