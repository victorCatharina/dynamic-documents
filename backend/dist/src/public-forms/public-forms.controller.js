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
exports.PublicFormsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const public_forms_service_1 = require("./public-forms.service");
const create_submission_dto_1 = require("../submissions/dto/create-submission.dto");
const submission_response_dto_1 = require("../submissions/dto/submission-response.dto");
const public_decorator_1 = require("../common/decorators/public.decorator");
let PublicFormsController = class PublicFormsController {
    publicFormsService;
    constructor(publicFormsService) {
        this.publicFormsService = publicFormsService;
    }
    async getPublicForm(publicToken) {
        return this.publicFormsService.getPublicForm(publicToken);
    }
    async submitPublicForm(publicToken, body) {
        return this.publicFormsService.submitPublicForm(publicToken, body.data);
    }
};
exports.PublicFormsController = PublicFormsController;
__decorate([
    (0, common_1.Get)(':publicToken'),
    (0, swagger_1.ApiOperation)({ summary: 'Obter configuração e campos manuais de um formulário público' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Formulário público retornado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Formulário não encontrado' }),
    __param(0, (0, common_1.Param)('publicToken')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PublicFormsController.prototype, "getPublicForm", null);
__decorate([
    (0, common_1.Post)(':publicToken/submissions'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Enviar dados de preenchimento via formulário público' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Documento gerado com sucesso',
        type: submission_response_dto_1.SubmissionCreatedResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 422,
        description: 'Erro de validação ou envio indevido de campo INTEGRATION',
    }),
    __param(0, (0, common_1.Param)('publicToken')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, create_submission_dto_1.CreateSubmissionDto]),
    __metadata("design:returntype", Promise)
], PublicFormsController.prototype, "submitPublicForm", null);
exports.PublicFormsController = PublicFormsController = __decorate([
    (0, swagger_1.ApiTags)('Public Forms'),
    (0, public_decorator_1.Public)(),
    (0, common_1.Controller)('api/v1/public/forms'),
    __metadata("design:paramtypes", [public_forms_service_1.PublicFormsService])
], PublicFormsController);
//# sourceMappingURL=public-forms.controller.js.map