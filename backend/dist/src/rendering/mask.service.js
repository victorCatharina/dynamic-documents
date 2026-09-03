"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaskService = void 0;
const common_1 = require("@nestjs/common");
let MaskService = class MaskService {
    applyMask(value, maskOrType) {
        if (value === null || value === undefined || value === '') {
            return '';
        }
        const strValue = String(value).trim();
        if (!maskOrType) {
            return strValue;
        }
        const upperMask = maskOrType.toUpperCase();
        if (upperMask === 'CPF' || upperMask === '000.000.000-00') {
            return this.formatCpf(strValue);
        }
        if (upperMask === 'CNPJ' || upperMask === '00.000.000/0000-00') {
            return this.formatCnpj(strValue);
        }
        if (upperMask === 'CEP' || upperMask === '00000-000') {
            return this.formatCep(strValue);
        }
        if (upperMask === 'PHONE' || upperMask === 'TELEFONE' || upperMask === '(00) 00000-0000') {
            return this.formatPhone(strValue);
        }
        return this.applyPatternMask(strValue, maskOrType);
    }
    formatCpf(value) {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 3)
            return digits;
        if (digits.length <= 6)
            return `${digits.slice(0, 3)}.${digits.slice(3)}`;
        if (digits.length <= 9)
            return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`;
        return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9, 11)}`;
    }
    formatCnpj(value) {
        const digits = value.replace(/\D/g, '').slice(0, 14);
        if (digits.length <= 2)
            return digits;
        if (digits.length <= 5)
            return `${digits.slice(0, 2)}.${digits.slice(2)}`;
        if (digits.length <= 8)
            return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5)}`;
        if (digits.length <= 12)
            return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8)}`;
        return `${digits.slice(0, 2)}.${digits.slice(2, 5)}.${digits.slice(5, 8)}/${digits.slice(8, 12)}-${digits.slice(12, 14)}`;
    }
    formatCep(value) {
        const digits = value.replace(/\D/g, '').slice(0, 8);
        if (digits.length <= 5)
            return digits;
        return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }
    formatPhone(value) {
        const digits = value.replace(/\D/g, '').slice(0, 11);
        if (digits.length <= 2)
            return digits.length > 0 ? `(${digits}` : '';
        if (digits.length <= 6)
            return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10)
            return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    }
    formatDate(value) {
        if (!value)
            return '';
        try {
            const date = new Date(value);
            if (isNaN(date.getTime()))
                return String(value);
            const day = String(date.getUTCDate()).padStart(2, '0');
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const year = date.getUTCFullYear();
            return `${day}/${month}/${year}`;
        }
        catch {
            return String(value);
        }
    }
    formatNumber(value, decimalPlaces) {
        if (value === null || value === undefined || value === '')
            return '';
        const num = Number(value);
        if (isNaN(num))
            return String(value);
        if (decimalPlaces !== undefined && decimalPlaces >= 0) {
            return num.toLocaleString('pt-BR', {
                minimumFractionDigits: decimalPlaces,
                maximumFractionDigits: decimalPlaces,
            });
        }
        return num.toLocaleString('pt-BR');
    }
    applyPatternMask(value, pattern) {
        const cleanChars = value.replace(/[^a-zA-Z0-9]/g, '');
        let result = '';
        let charIndex = 0;
        for (let i = 0; i < pattern.length && charIndex < cleanChars.length; i++) {
            const maskChar = pattern[i];
            if (maskChar === '0' || maskChar === '#' || maskChar === '9') {
                result += cleanChars[charIndex++];
            }
            else if (maskChar === 'A' || maskChar === 'a') {
                result += cleanChars[charIndex++];
            }
            else {
                result += maskChar;
            }
        }
        return result;
    }
};
exports.MaskService = MaskService;
exports.MaskService = MaskService = __decorate([
    (0, common_1.Injectable)()
], MaskService);
//# sourceMappingURL=mask.service.js.map