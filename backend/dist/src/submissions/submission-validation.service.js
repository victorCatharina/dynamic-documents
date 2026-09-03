"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionValidationService = void 0;
const common_1 = require("@nestjs/common");
let SubmissionValidationService = class SubmissionValidationService {
    validate(template, data = {}, options = { allowIntegrationFields: true }) {
        const errors = [];
        const allowIntegration = options.allowIntegrationFields ?? true;
        if (!template || !Array.isArray(template.pages)) {
            return {
                valid: false,
                errors: [
                    {
                        field: 'template',
                        code: 'INVALID_TEMPLATE',
                        message: 'Template inválido para validação de submissão',
                    },
                ],
            };
        }
        const templateFields = [];
        template.pages.forEach((page) => {
            if (Array.isArray(page.fields)) {
                templateFields.push(...page.fields);
            }
        });
        if (!allowIntegration) {
            for (const key of Object.keys(data)) {
                const matchingField = templateFields.find((f) => f.key === key);
                if (matchingField && matchingField.inputMode === 'INTEGRATION') {
                    errors.push({
                        field: key,
                        code: 'INTEGRATION_FIELD_FORBIDDEN',
                        message: `O campo '${key}' é exclusivo para integração via API e não pode ser enviado pelo formulário público`,
                    });
                }
            }
        }
        for (const field of templateFields) {
            const val = data[field.key];
            const isProvided = val !== undefined && val !== null && val !== '';
            const isRequired = Boolean(field.validation?.required);
            if (!allowIntegration && field.inputMode === 'INTEGRATION') {
                continue;
            }
            if (isRequired && !isProvided) {
                errors.push({
                    field: field.key,
                    code: 'REQUIRED',
                    message: `O campo '${field.label || field.key}' é obrigatório`,
                });
                continue;
            }
            if (!isProvided) {
                continue;
            }
            if (field.type === 'TEXT') {
                const str = String(val);
                if (field.validation?.minLength !== undefined &&
                    str.length < field.validation.minLength) {
                    errors.push({
                        field: field.key,
                        code: 'MIN_LENGTH',
                        message: `O campo '${field.label || field.key}' deve ter no mínimo ${field.validation.minLength} caracteres`,
                        details: { minLength: field.validation.minLength, actual: str.length },
                    });
                }
                if (field.validation?.maxLength !== undefined &&
                    str.length > field.validation.maxLength) {
                    errors.push({
                        field: field.key,
                        code: 'MAX_LENGTH',
                        message: `O campo '${field.label || field.key}' deve ter no máximo ${field.validation.maxLength} caracteres`,
                        details: { maxLength: field.validation.maxLength, actual: str.length },
                    });
                }
                if (field.validation?.regex) {
                    try {
                        const regex = new RegExp(field.validation.regex);
                        if (!regex.test(str)) {
                            errors.push({
                                field: field.key,
                                code: 'PATTERN_MISMATCH',
                                message: `O campo '${field.label || field.key}' não atende ao formato esperado`,
                            });
                        }
                    }
                    catch {
                    }
                }
            }
            else if (field.type === 'NUMBER') {
                const num = Number(val);
                if (isNaN(num)) {
                    errors.push({
                        field: field.key,
                        code: 'INVALID_NUMBER',
                        message: `O campo '${field.label || field.key}' deve ser um número válido`,
                    });
                }
                else {
                    if (field.validation?.min !== undefined &&
                        num < field.validation.min) {
                        errors.push({
                            field: field.key,
                            code: 'MIN_VALUE',
                            message: `O campo '${field.label || field.key}' deve ser maior ou igual a ${field.validation.min}`,
                            details: { min: field.validation.min, actual: num },
                        });
                    }
                    if (field.validation?.max !== undefined &&
                        num > field.validation.max) {
                        errors.push({
                            field: field.key,
                            code: 'MAX_VALUE',
                            message: `O campo '${field.label || field.key}' deve ser menor ou igual a ${field.validation.max}`,
                            details: { max: field.validation.max, actual: num },
                        });
                    }
                }
            }
            else if (field.type === 'DATE') {
                const d = new Date(val);
                if (isNaN(d.getTime())) {
                    errors.push({
                        field: field.key,
                        code: 'INVALID_DATE',
                        message: `O campo '${field.label || field.key}' deve ser uma data válida`,
                    });
                }
                else {
                    if (field.validation?.minDate) {
                        const min = new Date(field.validation.minDate);
                        if (!isNaN(min.getTime()) && d < min) {
                            errors.push({
                                field: field.key,
                                code: 'MIN_DATE',
                                message: `Data não pode ser anterior a ${field.validation.minDate}`,
                            });
                        }
                    }
                    if (field.validation?.maxDate) {
                        const max = new Date(field.validation.maxDate);
                        if (!isNaN(max.getTime()) && d > max) {
                            errors.push({
                                field: field.key,
                                code: 'MAX_DATE',
                                message: `Data não pode ser posterior a ${field.validation.maxDate}`,
                            });
                        }
                    }
                }
            }
            else if (field.type === 'IMAGE' || field.type === 'FILE') {
                const str = String(val).trim();
                const isValidUrl = str.startsWith('http://') ||
                    str.startsWith('https://') ||
                    str.startsWith('data:image/') ||
                    str.startsWith('/api/v1/assets/');
                if (!isValidUrl) {
                    errors.push({
                        field: field.key,
                        code: 'INVALID_URL',
                        message: `O campo '${field.label || field.key}' deve ser uma URL válida ou imagem em base64`,
                    });
                }
            }
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
    validateOrThrow(template, data, options = { allowIntegrationFields: true }) {
        const result = this.validate(template, data, options);
        if (!result.valid) {
            throw new common_1.UnprocessableEntityException({
                statusCode: 422,
                code: 'VALIDATION_ERROR',
                message: 'Falha na validação dos dados da submissão',
                errors: result.errors,
            });
        }
    }
};
exports.SubmissionValidationService = SubmissionValidationService;
exports.SubmissionValidationService = SubmissionValidationService = __decorate([
    (0, common_1.Injectable)()
], SubmissionValidationService);
//# sourceMappingURL=submission-validation.service.js.map