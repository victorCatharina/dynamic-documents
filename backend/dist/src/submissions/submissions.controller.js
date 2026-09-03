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
exports.SubmissionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const submissions_service_1 = require("./submissions.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const public_decorator_1 = require("../common/decorators/public.decorator");
let SubmissionsController = class SubmissionsController {
    submissionsService;
    constructor(submissionsService) {
        this.submissionsService = submissionsService;
    }
    async findAll(page, limit, documentId) {
        return this.submissionsService.findAll({ page, limit, documentId });
    }
    async findById(id) {
        return this.submissionsService.findById(id);
    }
    async getDocument(id, res) {
        const { stream, originalName, size } = await this.submissionsService.getDocumentStream(id);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Length', size);
        res.setHeader('Content-Disposition', `inline; filename="${encodeURIComponent(originalName)}"`);
        stream.pipe(res);
    }
};
exports.SubmissionsController = SubmissionsController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.Get)('submissions'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar histórico de preenchimentos' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista paginada de submissions' }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "findAll", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('submissions/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Consultar detalhes de uma submission' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalhes da submission' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Submission não encontrada' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "findById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('submissions/:id/document'),
    (0, swagger_1.ApiOperation)({ summary: 'Baixar o documento PDF gerado da submission' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Stream do arquivo PDF' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Documento não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SubmissionsController.prototype, "getDocument", null);
exports.SubmissionsController = SubmissionsController = __decorate([
    (0, swagger_1.ApiTags)('Submissions'),
    (0, common_1.Controller)('api/v1'),
    __metadata("design:paramtypes", [submissions_service_1.SubmissionsService])
], SubmissionsController);
//# sourceMappingURL=submissions.controller.js.map