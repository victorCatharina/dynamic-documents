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
exports.CustomFieldsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const custom_fields_service_1 = require("./custom-fields.service");
const create_custom_field_dto_1 = require("./dto/create-custom-field.dto");
const update_custom_field_dto_1 = require("./dto/update-custom-field.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let CustomFieldsController = class CustomFieldsController {
    customFieldsService;
    constructor(customFieldsService) {
        this.customFieldsService = customFieldsService;
    }
    async create(createDto) {
        return this.customFieldsService.create(createDto);
    }
    async findAll() {
        return this.customFieldsService.findAll();
    }
    async findById(id) {
        return this.customFieldsService.findById(id);
    }
    async update(id, updateDto) {
        return this.customFieldsService.update(id, updateDto);
    }
    async delete(id) {
        await this.customFieldsService.delete(id);
    }
};
exports.CustomFieldsController = CustomFieldsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar nova definição de campo personalizado' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Campo personalizado criado' }),
    (0, swagger_1.ApiResponse)({ status: 409, description: 'Chave já existente' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_custom_field_dto_1.CreateCustomFieldDto]),
    __metadata("design:returntype", Promise)
], CustomFieldsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar catálogo de campos personalizados' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Lista de campos personalizados' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomFieldsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Buscar campo personalizado por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Detalhes do campo personalizado' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Campo não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomFieldsController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar campo personalizado' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Campo atualizado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_custom_field_dto_1.UpdateCustomFieldDto]),
    __metadata("design:returntype", Promise)
], CustomFieldsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Excluir campo personalizado' }),
    (0, swagger_1.ApiResponse)({ status: 204, description: 'Campo excluído' }),
    (0, swagger_1.ApiResponse)({
        status: 409,
        description: 'Conflito: campo em uso por versão publicada',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomFieldsController.prototype, "delete", null);
exports.CustomFieldsController = CustomFieldsController = __decorate([
    (0, swagger_1.ApiTags)('Custom Fields'),
    (0, swagger_1.ApiBearerAuth)('JWT'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('api/v1/custom-fields'),
    __metadata("design:paramtypes", [custom_fields_service_1.CustomFieldsService])
], CustomFieldsController);
//# sourceMappingURL=custom-fields.controller.js.map