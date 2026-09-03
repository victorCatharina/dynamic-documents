"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mask_service_1 = require("./mask.service");
describe('MaskService', () => {
    let service;
    beforeEach(() => {
        service = new mask_service_1.MaskService();
    });
    it('should format CPF correctly', () => {
        expect(service.applyMask('12345678900', 'CPF')).toBe('123.456.789-00');
        expect(service.applyMask('123.456.789-00', '000.000.000-00')).toBe('123.456.789-00');
    });
    it('should format CNPJ correctly', () => {
        expect(service.applyMask('12345678000199', 'CNPJ')).toBe('12.345.678/0001-99');
    });
    it('should format CEP correctly', () => {
        expect(service.applyMask('01001000', 'CEP')).toBe('01001-000');
    });
    it('should format Phone correctly', () => {
        expect(service.applyMask('11987654321', 'PHONE')).toBe('(11) 98765-4321');
        expect(service.applyMask('1187654321', 'PHONE')).toBe('(11) 8765-4321');
    });
    it('should format dates properly', () => {
        expect(service.formatDate('2026-09-02T12:00:00Z')).toBe('02/09/2026');
    });
    it('should format numbers with decimal places', () => {
        expect(service.formatNumber(1234.56, 2)).toContain('1.234,56');
    });
});
//# sourceMappingURL=mask.service.spec.js.map