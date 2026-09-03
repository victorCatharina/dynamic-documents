"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ImportService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const storage_service_1 = require("../storage/storage.service");
const document_versions_service_1 = require("../document-versions/document-versions.service");
const pdf_lib_1 = require("pdf-lib");
const mammoth = require("mammoth");
let ImportService = ImportService_1 = class ImportService {
    prisma;
    storageService;
    versionsService;
    logger = new common_1.Logger(ImportService_1.name);
    constructor(prisma, storageService, versionsService) {
        this.prisma = prisma;
        this.storageService = storageService;
        this.versionsService = versionsService;
    }
    async importPdf(documentId, file) {
        if (!file || !file.buffer) {
            throw new common_1.BadRequestException({
                code: 'MISSING_FILE',
                message: 'Arquivo PDF é obrigatório',
            });
        }
        if (file.mimetype !== 'application/pdf') {
            throw new common_1.BadRequestException({
                code: 'INVALID_MIME_TYPE',
                message: 'Apenas arquivos com formato application/pdf são permitidos',
            });
        }
        const document = await this.prisma.document.findFirst({
            where: { id: documentId, deletedAt: null },
        });
        if (!document) {
            throw new common_1.NotFoundException({
                code: 'DOCUMENT_NOT_FOUND',
                message: 'Documento não encontrado',
            });
        }
        const asset = await this.storageService.upload(file.buffer, {
            originalName: file.originalname || 'document.pdf',
            mimeType: 'application/pdf',
            documentId: document.id,
        });
        let pdfDoc;
        try {
            pdfDoc = await pdf_lib_1.PDFDocument.load(file.buffer);
        }
        catch (e) {
            throw new common_1.BadRequestException({
                code: 'CORRUPTED_PDF',
                message: 'Não foi possível processar o arquivo PDF fornecido',
            });
        }
        const pageCount = pdfDoc.getPageCount();
        if (pageCount === 0) {
            throw new common_1.BadRequestException({
                code: 'EMPTY_PDF',
                message: 'O PDF enviado não possui páginas',
            });
        }
        const firstPage = pdfDoc.getPage(0);
        const { width, height } = firstPage.getSize();
        const isLandscape = width > height;
        const pages = [];
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
        const template = {
            page: {
                size: 'A4',
                orientation: isLandscape ? 'LANDSCAPE' : 'PORTRAIT',
                margins: { top: 0, bottom: 0, left: 0, right: 0 },
            },
            pages,
        };
        const version = await this.versionsService.createVersion(document.id, {
            template,
        });
        this.logger.log(`Imported PDF (${pageCount} pages) as version ${version.versionNumber} for document ${document.id}`);
        return {
            version,
            asset,
            pageCount,
        };
    }
    async importDocx(documentId, file) {
        if (!file || !file.buffer) {
            throw new common_1.BadRequestException({
                code: 'MISSING_FILE',
                message: 'Arquivo DOCX é obrigatório',
            });
        }
        const document = await this.prisma.document.findFirst({
            where: { id: documentId, deletedAt: null },
        });
        if (!document) {
            throw new common_1.NotFoundException({
                code: 'DOCUMENT_NOT_FOUND',
                message: 'Documento não encontrado',
            });
        }
        const asset = await this.storageService.upload(file.buffer, {
            originalName: file.originalname || 'document.docx',
            mimeType: file.mimetype ||
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            documentId: document.id,
        });
        let extractedText = '';
        try {
            const result = await mammoth.extractRawText({ buffer: file.buffer });
            extractedText = result.value;
        }
        catch {
            extractedText = 'Conteúdo do documento DOCX importado';
        }
        const template = {
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
        this.logger.log(`Imported DOCX as version ${version.versionNumber} for document ${document.id}`);
        return {
            version,
            asset,
            extractedTextPreview: extractedText.slice(0, 300),
        };
    }
};
exports.ImportService = ImportService;
exports.ImportService = ImportService = ImportService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        storage_service_1.StorageService,
        document_versions_service_1.DocumentVersionsService])
], ImportService);
//# sourceMappingURL=import.service.js.map