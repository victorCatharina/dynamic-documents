import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmissionsService } from '../submissions/submissions.service';
import { DocumentTemplate } from '../templates/template.types';

@Injectable()
export class PublicFormsService {
  private readonly logger = new Logger(PublicFormsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly submissionsService: SubmissionsService,
  ) {}

  async getPublicForm(publicToken: string) {
    const document = await this.prisma.document.findFirst({
      where: { publicToken, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException({
        code: 'FORM_NOT_FOUND',
        message: 'Formulário público não encontrado ou link inválido',
      });
    }

    // Get published version
    let version = null;
    if (document.publishedVersionId) {
      version = await this.prisma.documentVersion.findUnique({
        where: { id: document.publishedVersionId },
      });
    }

    if (!version) {
      version = await this.prisma.documentVersion.findFirst({
        where: { documentId: document.id, status: 'PUBLISHED' },
        orderBy: { versionNumber: 'desc' },
      });
    }

    if (!version) {
      // In development fallback, if no published version, use latest version
      version = await this.prisma.documentVersion.findFirst({
        where: { documentId: document.id },
        orderBy: { versionNumber: 'desc' },
      });
    }

    if (!version) {
      throw new NotFoundException({
        code: 'NO_PUBLISHED_VERSION',
        message: 'Este documento ainda não possui uma versão publicada para preenchimento público',
      });
    }

    const template = version.template as unknown as DocumentTemplate;

    // Filter fields: ONLY MANUAL fields (Section 21, 23 & 31)
    const publicFields: any[] = [];

    if (template && Array.isArray(template.pages)) {
      template.pages.forEach((page) => {
        if (Array.isArray(page.fields)) {
          page.fields.forEach((field) => {
            // Strictly exclude INTEGRATION fields
            if (field.inputMode === 'MANUAL' || !field.inputMode) {
              publicFields.push({
                id: field.id,
                key: field.key,
                label: field.label || field.key,
                type: field.type,
                required: Boolean(field.validation?.required),
                validation: field.validation || {},
                mask: field.mask || null,
                style: {
                  fontSize: field.style?.fontSize,
                  alignment: field.style?.alignment,
                },
                pageNumber: page.number,
              });
            }
          });
        }
      });
    }

    return {
      documentName: document.name,
      description: document.description,
      publicToken: document.publicToken,
      version: version.versionNumber,
      fields: publicFields,
    };
  }

  async submitPublicForm(publicToken: string, data: Record<string, any>) {
    const document = await this.prisma.document.findFirst({
      where: { publicToken, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException({
        code: 'FORM_NOT_FOUND',
        message: 'Formulário público não encontrado',
      });
    }

    // Call SubmissionsService with isPublicForm = true
    return this.submissionsService.createSubmission(document.id, data, true);
  }
}
