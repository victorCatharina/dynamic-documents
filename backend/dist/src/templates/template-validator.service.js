"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateValidatorService = void 0;
const common_1 = require("@nestjs/common");
let TemplateValidatorService = class TemplateValidatorService {
    validPageSizes = ['A4', 'A5', 'LETTER', 'LEGAL'];
    validOrientations = ['PORTRAIT', 'LANDSCAPE'];
    validFieldTypes = ['TEXT', 'NUMBER', 'DATE', 'IMAGE', 'FILE'];
    validFieldInputModes = ['MANUAL', 'INTEGRATION'];
    validate(template) {
        const errors = [];
        if (!template || typeof template !== 'object') {
            return {
                valid: false,
                errors: [
                    {
                        code: 'INVALID_TEMPLATE',
                        message: 'Template deve ser um objeto JSON válido',
                    },
                ],
            };
        }
        if (!template.page || typeof template.page !== 'object') {
            errors.push({
                code: 'MISSING_PAGE_CONFIG',
                message: 'Configuração da página (page) é obrigatória',
            });
        }
        else {
            if (!this.validPageSizes.includes(template.page.size)) {
                errors.push({
                    code: 'INVALID_PAGE_SIZE',
                    message: `Tamanho de página inválido. Permitidos: ${this.validPageSizes.join(', ')}`,
                    details: { size: template.page.size },
                });
            }
            if (!this.validOrientations.includes(template.page.orientation)) {
                errors.push({
                    code: 'INVALID_PAGE_ORIENTATION',
                    message: `Orientação de página inválida. Permitidos: ${this.validOrientations.join(', ')}`,
                    details: { orientation: template.page.orientation },
                });
            }
        }
        if (!Array.isArray(template.pages) || template.pages.length === 0) {
            errors.push({
                code: 'EMPTY_PAGES',
                message: 'O template deve conter pelo menos uma página',
            });
            return { valid: errors.length === 0, errors };
        }
        const seenPageNumbers = new Set();
        const seenFieldKeys = new Map();
        template.pages.forEach((page, pageIndex) => {
            const pageNum = page.number ?? pageIndex + 1;
            if (typeof pageNum !== 'number' || pageNum < 1) {
                errors.push({
                    code: 'INVALID_PAGE_NUMBER',
                    message: `Número de página inválido no índice ${pageIndex}`,
                    page: pageNum,
                });
            }
            else if (seenPageNumbers.has(pageNum)) {
                errors.push({
                    code: 'DUPLICATE_PAGE_NUMBER',
                    message: `Número de página duplicado: ${pageNum}`,
                    page: pageNum,
                });
            }
            else {
                seenPageNumbers.add(pageNum);
            }
            if (!Array.isArray(page.fields)) {
                errors.push({
                    code: 'INVALID_PAGE_FIELDS',
                    message: `Campos da página ${pageNum} devem ser um array`,
                    page: pageNum,
                });
                return;
            }
            page.fields.forEach((field, fieldIndex) => {
                const fieldId = field.id || `field-${pageIndex}-${fieldIndex}`;
                if (!field.key || typeof field.key !== 'string' || field.key.trim() === '') {
                    errors.push({
                        code: 'MISSING_FIELD_KEY',
                        message: `Campo no índice ${fieldIndex} da página ${pageNum} não possui 'key'`,
                        page: pageNum,
                    });
                }
                else {
                    if (seenFieldKeys.has(field.key)) {
                        const previous = seenFieldKeys.get(field.key);
                        errors.push({
                            code: 'DUPLICATE_FIELD_KEY',
                            message: `Chave de campo duplicada: '${field.key}' já utilizada na página ${previous.pageNumber}`,
                            field: field.key,
                            page: pageNum,
                            details: {
                                key: field.key,
                                previousPage: previous.pageNumber,
                                previousFieldId: previous.fieldId,
                            },
                        });
                    }
                    else {
                        seenFieldKeys.set(field.key, { pageNumber: pageNum, fieldId });
                    }
                }
                if (!this.validFieldTypes.includes(field.type)) {
                    errors.push({
                        code: 'INVALID_FIELD_TYPE',
                        message: `Tipo de campo '${field.type}' inválido. Permitidos: ${this.validFieldTypes.join(', ')}`,
                        field: field.key,
                        page: pageNum,
                    });
                }
                if (field.inputMode && !this.validFieldInputModes.includes(field.inputMode)) {
                    errors.push({
                        code: 'INVALID_INPUT_MODE',
                        message: `Modo de entrada '${field.inputMode}' inválido. Permitidos: ${this.validFieldInputModes.join(', ')}`,
                        field: field.key,
                        page: pageNum,
                    });
                }
                if (!field.position || typeof field.position !== 'object') {
                    errors.push({
                        code: 'MISSING_FIELD_POSITION',
                        message: `Posição do campo '${field.key || fieldIndex}' é obrigatória`,
                        field: field.key,
                        page: pageNum,
                    });
                }
                else {
                    const { x, y, width, height } = field.position;
                    if (typeof x !== 'number' ||
                        typeof y !== 'number' ||
                        typeof width !== 'number' ||
                        typeof height !== 'number' ||
                        x < 0 ||
                        y < 0 ||
                        width <= 0 ||
                        height <= 0) {
                        errors.push({
                            code: 'INVALID_FIELD_POSITION',
                            message: `Posição/dimensão inválida para o campo '${field.key}' (x, y >= 0, width, height > 0)`,
                            field: field.key,
                            page: pageNum,
                            details: field.position,
                        });
                    }
                }
                if (field.validation && typeof field.validation === 'object') {
                    const val = field.validation;
                    if (val.minLength !== undefined && (typeof val.minLength !== 'number' || val.minLength < 0)) {
                        errors.push({
                            code: 'INVALID_VALIDATION_MIN_LENGTH',
                            message: `minLength deve ser um número >= 0 para o campo '${field.key}'`,
                            field: field.key,
                            page: pageNum,
                        });
                    }
                    if (val.maxLength !== undefined && (typeof val.maxLength !== 'number' || val.maxLength < 0)) {
                        errors.push({
                            code: 'INVALID_VALIDATION_MAX_LENGTH',
                            message: `maxLength deve ser um número >= 0 para o campo '${field.key}'`,
                            field: field.key,
                            page: pageNum,
                        });
                    }
                }
            });
        });
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    validateOrThrow(template) {
        const result = this.validate(template);
        if (!result.valid) {
            throw new common_1.BadRequestException({
                statusCode: 400,
                code: 'INVALID_TEMPLATE',
                message: 'Template de documento inválido',
                errors: result.errors,
            });
        }
        return template;
    }
};
exports.TemplateValidatorService = TemplateValidatorService;
exports.TemplateValidatorService = TemplateValidatorService = __decorate([
    (0, common_1.Injectable)()
], TemplateValidatorService);
//# sourceMappingURL=template-validator.service.js.map