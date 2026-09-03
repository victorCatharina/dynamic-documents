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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCustomFieldDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCustomFieldDto {
    key;
    label;
    type;
    inputMode;
    validation;
    formatting;
}
exports.CreateCustomFieldDto = CreateCustomFieldDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'nomePaciente',
        description: 'Chave única do campo (sem espaços, camelCase ou snake_case)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Chave do campo é obrigatória' }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9_]+$/, {
        message: 'Chave do campo deve conter apenas letras, números e underscores',
    }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateCustomFieldDto.prototype, "key", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Nome do Paciente',
        description: 'Rótulo legível do campo',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Rótulo do campo é obrigatório' }),
    (0, class_validator_1.MaxLength)(255),
    __metadata("design:type", String)
], CreateCustomFieldDto.prototype, "label", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['TEXT', 'NUMBER', 'DATE', 'PHONE', 'EMAIL', 'ID'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomFieldDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['MANUAL', 'ID'] }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCustomFieldDto.prototype, "inputMode", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Regras de validação (ex: { required: true, minLength: 3 })',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCustomFieldDto.prototype, "validation", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Regras de formatação (ex: { mask: "000.000.000-00" })',
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateCustomFieldDto.prototype, "formatting", void 0);
//# sourceMappingURL=create-custom-field.dto.js.map