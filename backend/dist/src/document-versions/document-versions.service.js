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
var DocumentVersionsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentVersionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const template_validator_service_1 = require("../templates/template-validator.service");
let DocumentVersionsService = DocumentVersionsService_1 = class DocumentVersionsService {
    prisma;
    templateValidator;
    logger = new common_1.Logger(DocumentVersionsService_1.name);
    constructor(prisma, templateValidator) {
        this.prisma = prisma;
        this.templateValidator = templateValidator;
    }
    getDefaultTemplate() {
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
    async createVersion(documentId, createDto) {
        const document = await this.prisma.document.findFirst({
            where: { id: documentId, deletedAt: null },
        });
        if (!document) {
            throw new common_1.NotFoundException({
                code: 'DOCUMENT_NOT_FOUND',
                message: 'Documento não encontrado',
            });
        }
        const latestVersion = await this.prisma.documentVersion.findFirst({
            where: { documentId },
            orderBy: { versionNumber: 'desc' },
        });
        const nextVersionNumber = latestVersion ? latestVersion.versionNumber + 1 : 1;
        let initialTemplate = this.getDefaultTemplate();
        if (createDto.sourceVersionId) {
            const sourceVersion = await this.prisma.documentVersion.findUnique({
                where: { id: createDto.sourceVersionId },
            });
            if (sourceVersion) {
                initialTemplate = sourceVersion.template;
            }
        }
        else if (createDto.template) {
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
        this.logger.log(`Created version ${nextVersionNumber} (ID: ${version.id}) for document ${documentId}`);
        return version;
    }
    async findAllByDocument(documentId) {
        const document = await this.prisma.document.findFirst({
            where: { id: documentId, deletedAt: null },
        });
        if (!document) {
            throw new common_1.NotFoundException({
                code: 'DOCUMENT_NOT_FOUND',
                message: 'Documento não encontrado',
            });
        }
        return this.prisma.documentVersion.findMany({
            where: { documentId },
            orderBy: { versionNumber: 'desc' },
        });
    }
    async findById(documentId, versionId) {
        const version = await this.prisma.documentVersion.findFirst({
            where: { id: versionId, documentId },
        });
        if (!version) {
            throw new common_1.NotFoundException({
                code: 'VERSION_NOT_FOUND',
                message: 'Versão do documento não encontrada',
            });
        }
        return version;
    }
    async updateVersion(documentId, versionId, updateDto) {
        const version = await this.findById(documentId, versionId);
        if (version.status === 'PUBLISHED') {
            throw new common_1.ConflictException({
                code: 'VERSION_IMMUTABLE',
                message: 'Uma versão publicada não pode ser alterada. Crie uma nova versão para realizar modificações.',
            });
        }
        if (version.status === 'ARCHIVED') {
            throw new common_1.ConflictException({
                code: 'VERSION_ARCHIVED',
                message: 'Uma versão arquivada não pode ser editada.',
            });
        }
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
    async publishVersion(documentId, versionId) {
        const version = await this.findById(documentId, versionId);
        if (version.status === 'PUBLISHED') {
            return version;
        }
        this.templateValidator.validateOrThrow(version.template);
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
        this.logger.log(`Published version ${version.versionNumber} (ID: ${versionId}) for document ${documentId}`);
        return publishedVersion;
    }
};
exports.DocumentVersionsService = DocumentVersionsService;
exports.DocumentVersionsService = DocumentVersionsService = DocumentVersionsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        template_validator_service_1.TemplateValidatorService])
], DocumentVersionsService);
//# sourceMappingURL=document-versions.service.js.map