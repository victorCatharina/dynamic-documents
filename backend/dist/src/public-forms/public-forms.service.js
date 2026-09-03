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
var PublicFormsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PublicFormsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const submissions_service_1 = require("../submissions/submissions.service");
let PublicFormsService = PublicFormsService_1 = class PublicFormsService {
    prisma;
    submissionsService;
    logger = new common_1.Logger(PublicFormsService_1.name);
    constructor(prisma, submissionsService) {
        this.prisma = prisma;
        this.submissionsService = submissionsService;
    }
    async getPublicForm(publicToken) {
        const document = await this.prisma.document.findFirst({
            where: { publicToken, deletedAt: null },
        });
        if (!document) {
            throw new common_1.NotFoundException({
                code: 'FORM_NOT_FOUND',
                message: 'Formulário público não encontrado ou link inválido',
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
                where: { documentId: document.id, status: 'PUBLISHED' },
                orderBy: { versionNumber: 'desc' },
            });
        }
        if (!version) {
            version = await this.prisma.documentVersion.findFirst({
                where: { documentId: document.id },
                orderBy: { versionNumber: 'desc' },
            });
        }
        if (!version) {
            throw new common_1.NotFoundException({
                code: 'NO_PUBLISHED_VERSION',
                message: 'Este documento ainda não possui uma versão publicada para preenchimento público',
            });
        }
        const template = version.template;
        const publicFields = [];
        if (template && Array.isArray(template.pages)) {
            template.pages.forEach((page) => {
                if (Array.isArray(page.fields)) {
                    page.fields.forEach((field) => {
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
    async submitPublicForm(publicToken, data) {
        const document = await this.prisma.document.findFirst({
            where: { publicToken, deletedAt: null },
        });
        if (!document) {
            throw new common_1.NotFoundException({
                code: 'FORM_NOT_FOUND',
                message: 'Formulário público não encontrado',
            });
        }
        return this.submissionsService.createSubmission(document.id, data, true);
    }
};
exports.PublicFormsService = PublicFormsService;
exports.PublicFormsService = PublicFormsService = PublicFormsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        submissions_service_1.SubmissionsService])
], PublicFormsService);
//# sourceMappingURL=public-forms.service.js.map