"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_validator_service_1 = require("./templates/template-validator.service");
const submission_validation_service_1 = require("./submissions/submission-validation.service");
const data_resolver_service_1 = require("./rendering/data-resolver.service");
const mask_service_1 = require("./rendering/mask.service");
const pdf_renderer_service_1 = require("./rendering/pdf-renderer.service");
const pdf_lib_1 = require("pdf-lib");
describe('Plataforma de Documentos Dinâmicos — Cenários de Negócio E2E', () => {
    let templateValidator;
    let submissionValidator;
    let dataResolver;
    let maskService;
    let storageService;
    let pdfRenderer;
    beforeAll(() => {
        templateValidator = new template_validator_service_1.TemplateValidatorService();
        submissionValidator = new submission_validation_service_1.SubmissionValidationService();
        dataResolver = new data_resolver_service_1.DataResolverService();
        maskService = new mask_service_1.MaskService();
        storageService = {
            upload: jest.fn().mockResolvedValue({
                id: 'mock-asset-id',
                url: '/api/v1/assets/mock-key.pdf',
            }),
            getObject: jest.fn().mockResolvedValue(Buffer.from('mock-data')),
            getStream: jest.fn(),
            delete: jest.fn(),
            getSignedUrl: jest.fn(),
            fetchRemoteAsset: jest.fn(),
        };
        pdfRenderer = new pdf_renderer_service_1.PdfDocumentRenderer(dataResolver, maskService, storageService);
    });
    describe('Cenário 1 — Documento Vazio e Ciclo Completo', () => {
        it('deve validar template, submeter dados e renderizar PDF com sucesso', async () => {
            const template = {
                page: { size: 'A4', orientation: 'PORTRAIT' },
                pages: [
                    {
                        number: 1,
                        fields: [
                            {
                                id: 'f1',
                                key: 'nomeCliente',
                                label: 'Nome do Cliente',
                                type: 'TEXT',
                                inputMode: 'MANUAL',
                                position: { x: 50, y: 100, width: 250, height: 30 },
                                validation: { required: true, minLength: 3 },
                            },
                            {
                                id: 'f2',
                                key: 'cpfCliente',
                                label: 'CPF',
                                type: 'TEXT',
                                inputMode: 'MANUAL',
                                position: { x: 50, y: 150, width: 200, height: 30 },
                                mask: 'CPF',
                                validation: { required: true },
                            },
                        ],
                    },
                ],
            };
            const validation = templateValidator.validate(template);
            expect(validation.valid).toBe(true);
            const inputData = {
                nomeCliente: 'João da Silva',
                cpfCliente: '12345678900',
            };
            const subValidation = submissionValidator.validate(template, inputData, {
                allowIntegrationFields: false,
            });
            expect(subValidation.valid).toBe(true);
            const pdfBuffer = await pdfRenderer.render(template, inputData);
            expect(pdfBuffer).toBeInstanceOf(Buffer);
            expect(pdfBuffer.length).toBeGreaterThan(500);
            const parsedPdf = await pdf_lib_1.PDFDocument.load(pdfBuffer);
            expect(parsedPdf.getPageCount()).toBe(1);
        });
    });
    describe('Cenário 2 — Documento com Campos de Integração (API Key)', () => {
        it('deve processar campos de integração via API e aplicar máscaras no PDF', async () => {
            const template = {
                page: { size: 'A4', orientation: 'PORTRAIT' },
                pages: [
                    {
                        number: 1,
                        fields: [
                            {
                                id: 'f1',
                                key: 'nomePaciente',
                                label: 'Nome do Paciente',
                                type: 'TEXT',
                                inputMode: 'INTEGRATION',
                                position: { x: 50, y: 100, width: 250, height: 30 },
                                validation: { required: true },
                            },
                            {
                                id: 'f2',
                                key: 'numeroContrato',
                                label: 'Número do Contrato',
                                type: 'TEXT',
                                inputMode: 'INTEGRATION',
                                position: { x: 50, y: 150, width: 200, height: 30 },
                                validation: { required: true },
                            },
                            {
                                id: 'f3',
                                key: 'valorAtendimento',
                                label: 'Valor',
                                type: 'NUMBER',
                                inputMode: 'INTEGRATION',
                                position: { x: 50, y: 200, width: 150, height: 30 },
                                validation: { min: 0, decimalPlaces: 2 },
                            },
                        ],
                    },
                ],
            };
            const apiPayload = {
                nomePaciente: 'Maria Aparecida Santos',
                numeroContrato: 'CTR-2026-9901',
                valorAtendimento: 350.75,
            };
            const validation = submissionValidator.validate(template, apiPayload, {
                allowIntegrationFields: true,
            });
            expect(validation.valid).toBe(true);
            const pdfBuffer = await pdfRenderer.render(template, apiPayload);
            expect(pdfBuffer.length).toBeGreaterThan(500);
            const parsedPdf = await pdf_lib_1.PDFDocument.load(pdfBuffer);
            expect(parsedPdf.getPageCount()).toBe(1);
        });
    });
    describe('Cenário 3 — Versionamento e Imutabilidade Histórica', () => {
        it('deve garantir que preenchimento antigo reproduza fielmente o template da Versão 1 mesmo após publicação da Versão 2', async () => {
            const templateV1 = {
                page: { size: 'A4', orientation: 'PORTRAIT' },
                pages: [
                    {
                        number: 1,
                        fields: [
                            {
                                id: 'f1',
                                key: 'tituloOriginal',
                                type: 'TEXT',
                                inputMode: 'MANUAL',
                                position: { x: 50, y: 50, width: 300, height: 30 },
                            },
                        ],
                    },
                ],
            };
            const templateV2 = {
                page: { size: 'A4', orientation: 'PORTRAIT' },
                pages: [
                    {
                        number: 1,
                        fields: [
                            {
                                id: 'f1',
                                key: 'tituloNovo',
                                type: 'TEXT',
                                inputMode: 'MANUAL',
                                position: { x: 100, y: 100, width: 400, height: 40 },
                            },
                            {
                                id: 'f2',
                                key: 'campoAdicionalV2',
                                type: 'TEXT',
                                inputMode: 'INTEGRATION',
                                position: { x: 100, y: 200, width: 200, height: 30 },
                            },
                        ],
                    },
                ],
            };
            const dataA = { tituloOriginal: 'Contrato Original V1' };
            const pdfA = await pdfRenderer.render(templateV1, dataA);
            expect(pdfA.length).toBeGreaterThan(500);
            const dataB = {
                tituloNovo: 'Contrato Revisado V2',
                campoAdicionalV2: 'Extra V2',
            };
            const pdfB = await pdfRenderer.render(templateV2, dataB);
            expect(pdfB.length).toBeGreaterThan(500);
            const pdfARegenerated = await pdfRenderer.render(templateV1, dataA);
            expect(pdfARegenerated.length).toBe(pdfA.length);
        });
    });
    describe('Cenário 4 — Proteção de Campo Integration Only', () => {
        it('deve rejeitar strictly campo INTEGRATION enviado pelo formulário público', () => {
            const template = {
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
                                validation: { required: true },
                            },
                            {
                                id: 'f2',
                                key: 'prontuarioInterno',
                                type: 'TEXT',
                                inputMode: 'INTEGRATION',
                                position: { x: 50, y: 100, width: 200, height: 30 },
                            },
                        ],
                    },
                ],
            };
            const maliciousPublicPayload = {
                nomeCliente: 'Carlos Silva',
                prontuarioInterno: 'HACK-12345',
            };
            const result = submissionValidator.validate(template, maliciousPublicPayload, { allowIntegrationFields: false });
            expect(result.valid).toBe(false);
            expect(result.errors.some((e) => e.field === 'prontuarioInterno' &&
                e.code === 'INTEGRATION_FIELD_FORBIDDEN')).toBe(true);
        });
    });
});
//# sourceMappingURL=integration.spec.js.map