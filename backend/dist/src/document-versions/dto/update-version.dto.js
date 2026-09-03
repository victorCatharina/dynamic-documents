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
exports.UpdateVersionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateVersionDto {
    template;
}
exports.UpdateVersionDto = UpdateVersionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Template JSON completo atualizado',
        example: {
            page: { size: 'A4', orientation: 'PORTRAIT' },
            pages: [
                {
                    number: 1,
                    fields: [
                        {
                            id: 'field-1',
                            key: 'nomeCliente',
                            type: 'TEXT',
                            inputMode: 'MANUAL',
                            position: { x: 50, y: 50, width: 200, height: 30 },
                        },
                    ],
                },
            ],
        },
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Template é obrigatório' }),
    __metadata("design:type", Object)
], UpdateVersionDto.prototype, "template", void 0);
//# sourceMappingURL=update-version.dto.js.map