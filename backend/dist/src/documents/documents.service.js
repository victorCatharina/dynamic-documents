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
var DocumentsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const document_versions_service_1 = require("../document-versions/document-versions.service");
const crypto = require("crypto");
let DocumentsService = DocumentsService_1 = class DocumentsService {
    prisma;
    versionsService;
    logger = new common_1.Logger(DocumentsService_1.name);
    constructor(prisma, versionsService) {
        this.prisma = prisma;
        this.versionsService = versionsService;
    }
    generatePublicToken() {
        return crypto.randomBytes(16).toString('hex');
    }
    async create(createDto, userId) {
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
        await this.versionsService.createVersion(document.id, {
            template: this.versionsService.getDefaultTemplate(),
        });
        this.logger.log(`Created document: ${document.id} (${document.name})`);
        return this.findById(document.id);
    }
    async findAll(query) {
        const page = query.page || 1;
        const limit = query.limit || 20;
        const skip = (page - 1) * limit;
        const where = {
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
    async findById(id) {
        const document = await this.prisma.document.findFirst({
            where: { id, deletedAt: null },
            include: {
                versions: {
                    orderBy: { versionNumber: 'desc' },
                },
            },
        });
        if (!document) {
            throw new common_1.NotFoundException({
                code: 'DOCUMENT_NOT_FOUND',
                message: 'Documento não encontrado',
            });
        }
        return document;
    }
    async update(id, updateDto) {
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
    async delete(id) {
        await this.findById(id);
        await this.prisma.document.update({
            where: { id },
            data: { deletedAt: new Date() },
        });
        this.logger.log(`Soft deleted document: ${id}`);
    }
    async getSchema(documentId) {
        const document = await this.findById(documentId);
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
            throw new common_1.NotFoundException({
                code: 'NO_VERSION_AVAILABLE',
                message: 'O documento não possui nenhuma versão disponível para extração de schema',
            });
        }
        const template = targetVersion.template;
        const fieldsList = [];
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
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = DocumentsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        document_versions_service_1.DocumentVersionsService])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map