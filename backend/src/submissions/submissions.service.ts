import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubmissionValidationService } from './submission-validation.service';
import { RenderingService } from '../rendering/rendering.service';
import { StorageService } from '../storage/storage.service';
import { DocumentTemplate } from '../templates/template.types';
import { SubmissionCreatedResponseDto } from './dto/submission-response.dto';
import { Readable } from 'stream';

@Injectable()
export class SubmissionsService {
  private readonly logger = new Logger(SubmissionsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly validator: SubmissionValidationService,
    private readonly renderingService: RenderingService,
    private readonly storageService: StorageService,
  ) {}

  async createSubmission(
    documentId: string,
    data: Record<string, any>,
    isPublicForm: boolean = false,
  ): Promise<SubmissionCreatedResponseDto> {
    const document = await this.prisma.document.findFirst({
      where: { id: documentId, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException({
        code: 'DOCUMENT_NOT_FOUND',
        message: 'Documento não encontrado',
      });
    }

    // Identify target published version (Section 10 & 16)
    let version = null;
    if (document.publishedVersionId) {
      version = await this.prisma.documentVersion.findUnique({
        where: { id: document.publishedVersionId },
      });
    }

    if (!version) {
      // If no published version, look for latest published, or throw error
      version = await this.prisma.documentVersion.findFirst({
        where: { documentId, status: 'PUBLISHED' },
        orderBy: { versionNumber: 'desc' },
      });
    }

    if (!version) {
      // In development fallback, if no published version, use latest version
      version = await this.prisma.documentVersion.findFirst({
        where: { documentId },
        orderBy: { versionNumber: 'desc' },
      });
    }

    if (!version) {
      throw new BadRequestException({
        code: 'NO_VERSION_AVAILABLE',
        message: 'O documento não possui versão publicada para processamento',
      });
    }

    const template = version.template as unknown as DocumentTemplate;

    // Validate incoming data
    this.validator.validateOrThrow(template, data, {
      allowIntegrationFields: !isPublicForm,
    });

    // Create Submission record in DB (Section 54 transaction / persistence)
    const submission = await this.prisma.submission.create({
      data: {
        documentId: document.id,
        documentVersionId: version.id, // Mandatory link to immutable version!
        data: JSON.stringify(data || {}),
        status: 'SUBMITTED',
      },
    });

    try {
      // Render PDF (Section 26 & 42)
      const pdfBuffer = await this.renderingService.renderPdf(template, data);

      // Upload generated PDF asset to storage (Section 17)
      const asset = await this.storageService.upload(pdfBuffer, {
        originalName: `${document.name.replace(/[^a-zA-Z0-9_-]/g, '_')}_${submission.id.slice(0, 8)}.pdf`,
        mimeType: 'application/pdf',
        documentId: document.id,
      });

      // Update submission status to GENERATED
      await this.prisma.submission.update({
        where: { id: submission.id },
        data: {
          status: 'GENERATED',
          generatedAssetId: asset.id,
        },
      });

      this.logger.log(
        `Generated submission ${submission.id} using document version ${version.versionNumber}`,
      );

      return {
        submissionId: submission.id,
        documentId: document.id,
        version: version.versionNumber,
        status: 'GENERATED',
        documentUrl: `/api/v1/submissions/${submission.id}/document`,
      };
    } catch (error) {
      this.logger.error(
        `Error generating PDF for submission ${submission.id}: ${error.message}`,
        error.stack,
      );
      await this.prisma.submission.update({
        where: { id: submission.id },
        data: { status: 'FAILED' },
      });
      throw error;
    }
  }

  async findAll(query: { page?: number; limit?: number; documentId?: string }) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page - 1) * limit;

    const where = query.documentId ? { documentId: query.documentId } : {};

    const [total, data] = await Promise.all([
      this.prisma.submission.count({ where }),
      this.prisma.submission.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          document: {
            select: { id: true, name: true },
          },
          documentVersion: {
            select: { id: true, versionNumber: true, status: true },
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

  async findById(submissionId: string) {
    const submission = await this.prisma.submission.findUnique({
      where: { id: submissionId },
      include: {
        document: {
          select: { id: true, name: true, publicToken: true },
        },
        documentVersion: {
          select: { id: true, versionNumber: true, status: true },
        },
        generatedAsset: true,
      },
    });

    if (!submission) {
      throw new NotFoundException({
        code: 'SUBMISSION_NOT_FOUND',
        message: 'Preenchimento (Submission) não encontrado',
      });
    }

    return submission;
  }

  async getDocumentStream(
    submissionId: string,
  ): Promise<{ stream: Readable; originalName: string; size: number }> {
    const submission = await this.findById(submissionId);

    if (!submission.generatedAssetId) {
      throw new NotFoundException({
        code: 'DOCUMENT_NOT_GENERATED',
        message: 'O documento PDF ainda não foi gerado ou falhou na geração',
      });
    }

    const asset = await this.prisma.asset.findUnique({
      where: { id: submission.generatedAssetId },
    });

    if (!asset) {
      throw new NotFoundException({
        code: 'ASSET_NOT_FOUND',
        message: 'Arquivo do documento não encontrado no armazenamento',
      });
    }

    const stream = await this.storageService.getStream(asset.id);
    return {
      stream,
      originalName: asset.originalName,
      size: asset.size,
    };
  }
}
