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
exports.DocumentVersionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const document_versions_service_1 = require("./document-versions.service");
const create_version_dto_1 = require("./dto/create-version.dto");
const update_version_dto_1 = require("./dto/update-version.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let DocumentVersionsController = class DocumentVersionsController {
    versionsService;
    constructor(versionsService) {
        this.versionsService = versionsService;
    }
    async createVersion(documentId, createDto) {
        return this.versionsService.createVersion(documentId, createDto);
    }
    async findAll(documentId) {
        return this.versionsService.findAllByDocument(documentId);
    }
    async findById(documentId, versionId) {
        return this.versionsService.findById(documentId, versionId);
    }
    async updateVersion(documentId, versionId, updateDto) {
        return this.versionsService.updateVersion(documentId, versionId, updateDto);
    }
    async publishVersion(documentId, versionId) {
        return this.versionsService.publishVersion(documentId, versionId);
    }
};
exports.DocumentVersionsController = DocumentVersionsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova versão de um documento' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Versão criada com sucesso' }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_version_dto_1.CreateVersionDto]),
    __metadata("design:returntype", Promise)
], DocumentVersionsController.prototype, "createVersion", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todas as versões de um documento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de versões' }),
    __param(0, (0, common_1.Param)('documentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentVersionsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':versionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar detalhes de uma versão do documento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalhes da versão' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Versão não encontrada' }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, common_1.Param)('versionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DocumentVersionsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':versionId'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar template de uma versão em rascunho (DRAFT)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Versão atualizada' }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflito: Versões publicadas não podem ser alteradas',
    }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, common_1.Param)('versionId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, update_version_dto_1.UpdateVersionDto]),
    __metadata("design:returntype", Promise)
], DocumentVersionsController.prototype, "updateVersion", null);
__decorate([
    (0, common_1.Post)(':versionId/publish'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Publicar versão do documento' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Versão publicada com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Template inválido para publicação' }),
    __param(0, (0, common_1.Param)('documentId')),
    __param(1, (0, common_1.Param)('versionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DocumentVersionsController.prototype, "publishVersion", null);
exports.DocumentVersionsController = DocumentVersionsController = __decorate([
    (0, swagger_1.ApiTags)('Document Versions'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/v1/documents/:documentId/versions'),
    __metadata("design:paramtypes", [document_versions_service_1.DocumentVersionsService])
], DocumentVersionsController);
//# sourceMappingURL=document-versions.controller.js.map