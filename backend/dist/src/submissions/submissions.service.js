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
var SubmissionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const submission_validation_service_1 = require("./submission-validation.service");
const rendering_service_1 = require("../rendering/rendering.service");
const storage_service_1 = require("../storage/storage.service");
let SubmissionsService = SubmissionsService_1 = class SubmissionsService {
    prisma;
    validator;
    renderingService;
    storageService;
    logger = new common_1.Logger(SubmissionsService_1.name);
    constructor(prisma, validator, renderingService, storageService) {
        this.prisma = prisma;
        this.validator = validator;
        this.renderingService = renderingService;
        this.storageService = storageService;
    }
    async createSubmission(documentId, data, isPublicForm = false) {
        const document = await this.prisma.document.findFirst({
            where: { id: documentId, deletedAt: null },
        });
        if (!document) {
            throw new common_1.NotFoundException({
                code: 'DOCUMENT_NOT_FOUND',
                message: 'Documento não encontrado',
            });
        }
        let version = null;
        if (document.publishedVersionId) {
            version = await this.prisma.documentVersion.findUnique({
                where: { id: document.publishedVersionId },
            });
        }
        if (!version) {
            version = await this.prisma.documentVersion.findFirst({
                where: { documentId, status: 'PUBLISHED' },
                orderBy: { versionNumber: 'desc' },
            });
        }
        if (!version) {
            version = await this.prisma.documentVersion.findFirst({
                where: { documentId },
                orderBy: { versionNumber: 'desc' },
            });
        }
        if (!version) {
            throw new common_1.BadRequestException({
                code: 'NO_VERSION_AVAILABLE',
                message: 'O documento não possui versão publicada para processamento',
            });
        }
        const template = version.template;
        this.validator.validateOrThrow(template, data, {
            allowIntegrationFields: !isPublicForm,
        });
        const submission = await this.prisma.submission.create({
            data: {
                documentId: document.id,
                documentVersionId: version.id,
                data: JSON.stringify(data || {}),
                status: 'SUBMITTED',
            },
        });
        try {
            const pdfBuffer = await this.renderingService.renderPdf(template, data);
            const asset = await this.storageService.upload(pdfBuffer, {
                originalName: `${document.name.replace(/[^a-zA-Z0-9_-]/g, '_')}_${submission.id.slice(0, 8)}.pdf`,
                mimeType: 'application/pdf',
                documentId: document.id,
            });
            await this.prisma.submission.update({
                where: { id: submission.id },
                data: {
                    status: 'GENERATED',
                    generatedAssetId: asset.id,
                },
            });
            this.logger.log(`Generated submission ${submission.id} using document version ${version.versionNumber}`);
            return {
                submissionId: submission.id,
                documentId: document.id,
                version: version.versionNumber,
                status: 'GENERATED',
                documentUrl: `/api/v1/submissions/${submission.id}/document`,
            };
        }
        catch (error) {
            this.logger.error(`Error generating PDF for submission ${submission.id}: ${error.message}`, error.stack);
            await this.prisma.submission.update({
                where: { id: submission.id },
                data: { status: 'FAILED' },
            });
            throw error;
        }
    }
    async findAll(query) {
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
    async findById(submissionId) {
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
            throw new common_1.NotFoundException({
                code: 'SUBMISSION_NOT_FOUND',
                message: 'Preenchimento (Submission) não encontrado',
            });
        }
        return submission;
    }
    async getDocumentStream(submissionId) {
        const submission = await this.findById(submissionId);
        if (!submission.generatedAssetId) {
            throw new common_1.NotFoundException({
                code: 'DOCUMENT_NOT_GENERATED',
                message: 'O documento PDF ainda não foi gerado ou falhou na geração',
            });
        }
        const asset = await this.prisma.asset.findUnique({
            where: { id: submission.generatedAssetId },
        });
        if (!asset) {
            throw new common_1.NotFoundException({
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
};
exports.SubmissionsService = SubmissionsService;
exports.SubmissionsService = SubmissionsService = SubmissionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        submission_validation_service_1.SubmissionValidationService,
        rendering_service_1.RenderingService,
        storage_service_1.StorageService])
], SubmissionsService);
//# sourceMappingURL=submissions.service.js.map