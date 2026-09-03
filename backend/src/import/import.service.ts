import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { DocumentVersionsService } from '../document-versions/document-versions.service';
import { PDFDocument } from 'pdf-lib';
import * as mammoth from 'mammoth';
import { DocumentTemplate, DocumentTemplatePage } from '../templates/template.types';

@Injectable()
export class ImportService {
  private readonly logger = new Logger(ImportService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly storageService: StorageService,
    private readonly versionsService: DocumentVersionsService,
  ) {}

  async importPdf(documentId: string, file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new BadRequestException({
        code: 'MISSING_FILE',
        message: 'Arquivo PDF é obrigatório',
      });
    }

    if (file.mimetype !== 'application/pdf') {
      throw new BadRequestException({
        code: 'INVALID_MIME_TYPE',
        message: 'Apenas arquivos com formato application/pdf são permitidos',
      });
    }

    const document = await this.prisma.document.findFirst({
      where: { id: documentId, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException({
        code: 'DOCUMENT_NOT_FOUND',
        message: 'Documento não encontrado',
      });
    }

    // 1. Upload asset to storage (Section 40)
    const asset = await this.storageService.upload(file.buffer, {
      originalName: file.originalname || 'document.pdf',
      mimeType: 'application/pdf',
      documentId: document.id,
    });

    // 2. Load PDF with pdf-lib to inspect pages and dimensions
    let pdfDoc: PDFDocument;
    try {
      pdfDoc = await PDFDocument.load(file.buffer);
    } catch (e) {
      throw new BadRequestException({
        code: 'CORRUPTED_PDF',
        message: 'Não foi possível processar o arquivo PDF fornecido',
      });
    }

    const pageCount = pdfDoc.getPageCount();
    if (pageCount === 0) {
      throw new BadRequestException({
        code: 'EMPTY_PDF',
        message: 'O PDF enviado não possui páginas',
      });
    }

    const firstPage = pdfDoc.getPage(0);
    const { width, height } = firstPage.getSize();
    const isLandscape = width > height;

    const pages: DocumentTemplatePage[] = [];

    for (let i = 1; i <= pageCount; i++) {
      pages.push({
        number: i,
        background: {
          assetId: asset.id,
          url: asset.url || undefined,
        },
        fields: [],
      });
    }

    const template: DocumentTemplate = {
      page: {
        size: 'A4',
        orientation: isLandscape ? 'LANDSCAPE' : 'PORTRAIT',
        margins: { top: 0, bottom: 0, left: 0, right: 0 },
      },
      pages,
    };

    // 3. Create new Version with the background template
    const version = await this.versionsService.createVersion(document.id, {
      template,
    });

    this.logger.log(
      `Imported PDF (${pageCount} pages) as version ${version.versionNumber} for document ${document.id}`,
    );

    return {
      version,
      asset,
      pageCount,
    };
  }

  async importDocx(documentId: string, file: Express.Multer.File) {
    if (!file || !file.buffer) {
      throw new BadRequestException({
        code: 'MISSING_FILE',
        message: 'Arquivo DOCX é obrigatório',
      });
    }

    const document = await this.prisma.document.findFirst({
      where: { id: documentId, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException({
        code: 'DOCUMENT_NOT_FOUND',
        message: 'Documento não encontrado',
      });
    }

    // 1. Upload DOCX asset to storage (Section 41)
    const asset = await this.storageService.upload(file.buffer, {
      originalName: file.originalname || 'document.docx',
      mimeType:
        file.mimetype ||
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      documentId: document.id,
    });

    // 2. Extract text/html using mammoth
    let extractedText = '';
    try {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      extractedText = result.value;
    } catch {
      extractedText = 'Conteúdo do documento DOCX importado';
    }

    // Create an initial template page with background asset reference
    const template: DocumentTemplate = {
      page: {
        size: 'A4',
        orientation: 'PORTRAIT',
        margins: { top: 36, bottom: 36, left: 36, right: 36 },
      },
      pages: [
        {
          number: 1,
          background: {
            assetId: asset.id,
            url: asset.url || undefined,
          },
          fields: [],
        },
      ],
    };

    const version = await this.versionsService.createVersion(document.id, {
      template,
    });

    this.logger.log(
      `Imported DOCX as version ${version.versionNumber} for document ${document.id}`,
    );

    return {
      version,
      asset,
      extractedTextPreview: extractedText.slice(0, 300),
    };
  }
}
