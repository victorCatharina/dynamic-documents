"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const submission_validation_service_1 = require("./submission-validation.service");
describe('SubmissionValidationService', () => {
    let service;
    const mockTemplate = {
        page: { size: 'A4', orientation: 'PORTRAIT' },
        pages: [
            {
                number: 1,
                fields: [
                    {
                        id: 'f1',
                        key: 'nomeCliente',
                        type: 'TEXT',
                        inputMode: 'MANUAL',
                        position: { x: 50, y: 50, width: 200, height: 30 },
                        validation: { required: true, minLength: 3, maxLength: 50 },
                    },
                    {
                        id: 'f2',
                        key: 'idade',
                        type: 'NUMBER',
                        inputMode: 'MANUAL',
                        position: { x: 50, y: 100, width: 100, height: 30 },
                        validation: { required: false, min: 18, max: 120 },
                    },
                    {
                        id: 'f3',
                        key: 'codigoIntegracao',
                        type: 'TEXT',
                        inputMode: 'INTEGRATION',
                        position: { x: 50, y: 150, width: 200, height: 30 },
                        validation: { required: true },
                    },
                ],
            },
        ],
    };
    beforeEach(() => {
        service = new submission_validation_service_1.SubmissionValidationService();
    });
    it('should accept valid submission data in integration mode', () => {
        const data = {
            nomeCliente: 'Carlos Alberto',
            idade: 25,
            codigoIntegracao: 'ERP-999',
        };
        const result = service.validate(mockTemplate, data, {
            allowIntegrationFields: true,
        });
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });
    it('should reject missing required fields', () => {
        const data = {
            idade: 25,
            codigoIntegracao: 'ERP-999',
        };
        const result = service.validate(mockTemplate, data, {
            allowIntegrationFields: true,
        });
        expect(result.valid).toBe(false);
        expect(result.errors.some((e) => e.field === 'nomeCliente' && e.code === 'REQUIRED')).toBe(true);
    });
    it('should strictly reject INTEGRATION fields when submitted via public form (allowIntegrationFields: false)', () => {
        const data = {
            nomeCliente: 'Carlos Alberto',
            codigoIntegracao: 'TENTATIVA_DE_INJECAO',
        };
        const result = service.validate(mockTemplate, data, {
            allowIntegrationFields: false,
        });
        expect(result.valid).toBe(false);
        expect(result.errors.some((e) => e.field === 'codigoIntegracao' && e.code === 'INTEGRATION_FIELD_FORBIDDEN')).toBe(true);
    });
    it('should validate number minimum and maximum constraints', () => {
        const data = {
            nomeCliente: 'Carlos Alberto',
            idade: 15,
            codigoIntegracao: 'ERP-1',
        };
        const result = service.validate(mockTemplate, data, {
            allowIntegrationFields: true,
        });
        expect(result.valid).toBe(false);
        expect(result.errors.some((e) => e.field === 'idade' && e.code === 'MIN_VALUE')).toBe(true);
    });
});
//# sourceMappingURL=submission-validation.service.spec.js.map