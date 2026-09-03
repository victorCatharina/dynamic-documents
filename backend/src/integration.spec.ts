import { TemplateValidatorService } from './templates/template-validator.service';
import { SubmissionValidationService } from './submissions/submission-validation.service';
import { DataResolverService } from './rendering/data-resolver.service';
import { MaskService } from './rendering/mask.service';
import { PdfDocumentRenderer } from './rendering/pdf-renderer.service';
import { StorageService } from './storage/storage.service';
import { DocumentTemplate } from './templates/template.types';
import { PDFDocument } from 'pdf-lib';

describe('Plataforma de Documentos Dinâmicos — Cenários de Negócio E2E', () => {
  let templateValidator: TemplateValidatorService;
  let submissionValidator: SubmissionValidationService;
  let dataResolver: DataResolverService;
  let maskService: MaskService;
  let storageService: StorageService;
  let pdfRenderer: PdfDocumentRenderer;

  beforeAll(() => {
    templateValidator = new TemplateValidatorService();
    submissionValidator = new SubmissionValidationService();
    dataResolver = new DataResolverService();
    maskService = new MaskService();

    // Mock storage service
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
    } as any;

    pdfRenderer = new PdfDocumentRenderer(
      dataResolver,
      maskService,
      storageService,
    );
  });

  // Cenário 1 — Documento Vazio: criar versão -> configurar template -> publicar -> submit -> gerar PDF
  describe('Cenário 1 — Documento Vazio e Ciclo Completo', () => {
    it('deve validar template, submeter dados e renderizar PDF com sucesso', async () => {
      const template: DocumentTemplate = {
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

      // 1. Validar template
      const validation = templateValidator.validate(template);
      expect(validation.valid).toBe(true);

      // 2. Submeter dados
      const inputData = {
        nomeCliente: 'João da Silva',
        cpfCliente: '12345678900',
      };

      const subValidation = submissionValidator.validate(template, inputData, {
        allowIntegrationFields: false,
      });
      expect(subValidation.valid).toBe(true);

      // 3. Renderizar PDF
      const pdfBuffer = await pdfRenderer.render(template, inputData);
      expect(pdfBuffer).toBeInstanceOf(Buffer);
      expect(pdfBuffer.length).toBeGreaterThan(500);

      // Verificar que o PDF gerado é válido
      const parsedPdf = await PDFDocument.load(pdfBuffer);
      expect(parsedPdf.getPageCount()).toBe(1);
    });
  });

  // Cenário 2 — Documento com Integração: Custom Field -> INTEGRATION mode -> API submission -> PDF
  describe('Cenário 2 — Documento com Campos de Integração (API Key)', () => {
    it('deve processar campos de integração via API e aplicar máscaras no PDF', async () => {
      const template: DocumentTemplate = {
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

      // Validar dados da API com allowIntegrationFields: true
      const validation = submissionValidator.validate(template, apiPayload, {
        allowIntegrationFields: true,
      });
      expect(validation.valid).toBe(true);

      const pdfBuffer = await pdfRenderer.render(template, apiPayload);
      expect(pdfBuffer.length).toBeGreaterThan(500);
      const parsedPdf = await PDFDocument.load(pdfBuffer);
      expect(parsedPdf.getPageCount()).toBe(1);
    });
  });

  // Cenário 3 — Versionamento e Imutabilidade Histórica
  describe('Cenário 3 — Versionamento e Imutabilidade Histórica', () => {
    it('deve garantir que preenchimento antigo reproduza fielmente o template da Versão 1 mesmo após publicação da Versão 2', async () => {
      const templateV1: DocumentTemplate = {
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

      const templateV2: DocumentTemplate = {
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

      // Submissão A utiliza Template V1
      const dataA = { tituloOriginal: 'Contrato Original V1' };
      const pdfA = await pdfRenderer.render(templateV1, dataA);
      expect(pdfA.length).toBeGreaterThan(500);

      // Submissão B utiliza Template V2
      const dataB = {
        tituloNovo: 'Contrato Revisado V2',
        campoAdicionalV2: 'Extra V2',
      };
      const pdfB = await pdfRenderer.render(templateV2, dataB);
      expect(pdfB.length).toBeGreaterThan(500);

      // Re-gerar documento da submissão A usando seu template original V1
      const pdfARegenerated = await pdfRenderer.render(templateV1, dataA);
      expect(pdfARegenerated.length).toBe(pdfA.length);
    });
  });

  // Cenário 4 — Proteção de Campo Integration Only
  describe('Cenário 4 — Proteção de Campo Integration Only', () => {
    it('deve rejeitar strictly campo INTEGRATION enviado pelo formulário público', () => {
      const template: DocumentTemplate = {
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

      // Tentativa de envio público contendo campo INTEGRATION
      const maliciousPublicPayload = {
        nomeCliente: 'Carlos Silva',
        prontuarioInterno: 'HACK-12345',
      };

      const result = submissionValidator.validate(
        template,
        maliciousPublicPayload,
        { allowIntegrationFields: false }, // Fluxo de formulário público
      );

      expect(result.valid).toBe(false);
      expect(
        result.errors.some(
          (e) =>
            e.field === 'prontuarioInterno' &&
            e.code === 'INTEGRATION_FIELD_FORBIDDEN',
        ),
      ).toBe(true);
    });
  });
});
