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
var CustomFieldsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomFieldsService = CustomFieldsService_1 = class CustomFieldsService {
    prisma;
    logger = new common_1.Logger(CustomFieldsService_1.name);
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createDto) {
        const existing = await this.prisma.customFieldDefinition.findUnique({
            where: { key: createDto.key },
        });
        if (existing) {
            throw new common_1.ConflictException({
                code: 'DUPLICATE_KEY',
                message: `Já existe um campo personalizado com a chave '${createDto.key}'`,
            });
        }
        const field = await this.prisma.customFieldDefinition.create({
            data: {
                key: createDto.key,
                label: createDto.label,
                type: createDto.type,
                inputMode: createDto.inputMode,
                validation: createDto.validation || null,
                formatting: createDto.formatting || null,
            },
        });
        this.logger.log(`Created custom field definition: ${field.key} (${field.id})`);
        return field;
    }
    async findAll() {
        return this.prisma.customFieldDefinition.findMany({
            orderBy: { key: 'asc' },
        });
    }
    async findById(id) {
        const field = await this.prisma.customFieldDefinition.findUnique({
            where: { id },
        });
        if (!field) {
            throw new common_1.NotFoundException({
                code: 'CUSTOM_FIELD_NOT_FOUND',
                message: 'Campo personalizado não encontrado',
            });
        }
        return field;
    }
    async update(id, updateDto) {
        await this.findById(id);
        const updated = await this.prisma.customFieldDefinition.update({
            where: { id },
            data: {
                ...(updateDto.label ? { label: updateDto.label } : {}),
                ...(updateDto.type ? { type: updateDto.type } : {}),
                ...(updateDto.inputMode ? { inputMode: updateDto.inputMode } : {}),
                ...(updateDto.validation !== undefined ? { validation: updateDto.validation } : {}),
                ...(updateDto.formatting !== undefined ? { formatting: updateDto.formatting } : {}),
            },
        });
        this.logger.log(`Updated custom field: ${id}`);
        return updated;
    }
    async delete(id) {
        const field = await this.findById(id);
        const publishedVersions = await this.prisma.documentVersion.findMany({
            where: { status: 'PUBLISHED' },
        });
        for (const version of publishedVersions) {
            const template = version.template;
            if (template && Array.isArray(template.pages)) {
                for (const page of template.pages) {
                    if (Array.isArray(page.fields)) {
                        const hasField = page.fields.some((f) => f.key === field.key);
                        if (hasField) {
                            throw new common_1.ConflictException({
                                code: 'FIELD_IN_USE',
                                message: `Não é possível excluir o campo personalizado '${field.key}', pois está sendo utilizado pela versão ${version.versionNumber} (publicada) de um documento.`,
                            });
                        }
                    }
                }
            }
        }
        await this.prisma.customFieldDefinition.delete({
            where: { id },
        });
        this.logger.log(`Deleted custom field: ${field.key} (${id})`);
    }
};
exports.CustomFieldsService = CustomFieldsService;
exports.CustomFieldsService = CustomFieldsService = CustomFieldsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomFieldsService);
//# sourceMappingURL=custom-fields.service.js.map