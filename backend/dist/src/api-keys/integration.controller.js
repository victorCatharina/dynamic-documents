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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntegrationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_key_guard_1 = require("./guards/api-key.guard");
const submissions_service_1 = require("../submissions/submissions.service");
const submission_validation_service_1 = require("../submissions/submission-validation.service");
const prisma_service_1 = require("../prisma/prisma.service");
const create_submission_dto_1 = require("../submissions/dto/create-submission.dto");
const submission_response_dto_1 = require("../submissions/dto/submission-response.dto");
let IntegrationController = class IntegrationController {
    submissionsService;
    validationService;
    prisma;
    constructor(submissionsService, validationService, prisma) {
        this.submissionsService = submissionsService;
        this.validationService = validationService;
        this.prisma = prisma;
    }
    async submitViaApi(documentId, body) {
        return this.submissionsService.createSubmission(documentId, body.data, false);
    }
    async validatePayload(documentId, body) {
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
            throw new common_1.NotFoundException({
                code: 'NO_VERSION_AVAILABLE',
                message: 'Documento não possui versão para validação',
            });
        }
        const template = version.template;
        const result = this.validationService.validate(template, body.data || {}, {
            allowIntegrationFields: true,
        });
        return result;
    }
};
exports.IntegrationController = IntegrationController;
__decorate([
    (0, common_1.Post)(':id/submissions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Enviar dados via API externa para geração de documento (requer API Key)',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Documento gerado com sucesso',
        type: submission_response_dto_1.SubmissionCreatedResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 422,
        description: 'Erro de validação nos campos do documento',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_submission_dto_1.CreateSubmissionDto]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "submitViaApi", null);
__decorate([
    (0, common_1.Post)(':id/validate'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Validar payload de dados para um documento sem gerar a submission',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultado da validação',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_submission_dto_1.CreateSubmissionDto]),
    __metadata("design:returntype", Promise)
], IntegrationController.prototype, "validatePayload", null);
exports.IntegrationController = IntegrationController = __decorate([
    (0, swagger_1.ApiTags)('Integrations (API Key)'),
    (0, swagger_1.ApiBearerAuth)('API_KEY'),
    (0, common_1.UseGuards)(api_key_guard_1.ApiKeyGuard),
    (0, common_1.Controller)('api/v1/documents'),
    __metadata("design:paramtypes", [submissions_service_1.SubmissionsService,
        submission_validation_service_1.SubmissionValidationService,
        prisma_service_1.PrismaService])
], IntegrationController);
//# sourceMappingURL=integration.controller.js.map