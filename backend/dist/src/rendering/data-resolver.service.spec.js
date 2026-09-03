"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_resolver_service_1 = require("./data-resolver.service");
describe('DataResolverService', () => {
    let service;
    beforeEach(() => {
        service = new data_resolver_service_1.DataResolverService();
    });
    it('should resolve simple top-level keys', () => {
        const data = { nomeCliente: 'Maria Silva', idade: 30 };
        expect(service.resolveValue(data, 'nomeCliente')).toBe('Maria Silva');
        expect(service.resolveValue(data, 'idade')).toBe(30);
    });
    it('should resolve nested dot notation safely', () => {
        const data = {
            empresa: {
                razaoSocial: 'Tech Corp',
                endereco: { cidade: 'São Paulo' },
            },
        };
        expect(service.resolveValue(data, 'empresa.razaoSocial')).toBe('Tech Corp');
        expect(service.resolveValue(data, 'empresa.endereco.cidade')).toBe('São Paulo');
    });
    it('should return undefined gracefully for missing keys without throwing', () => {
        const data = { nome: 'João' };
        expect(service.resolveValue(data, 'inexistente')).toBeUndefined();
        expect(service.resolveValue(data, 'inexistente.profundo')).toBeUndefined();
    });
});
//# sourceMappingURL=data-resolver.service.spec.js.map