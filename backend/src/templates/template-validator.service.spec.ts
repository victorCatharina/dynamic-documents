import { TemplateValidatorService } from './template-validator.service';

describe('TemplateValidatorService', () => {
  let service: TemplateValidatorService;

  beforeEach(() => {
    service = new TemplateValidatorService();
  });

  it('should validate a correct template successfully', () => {
    const validTemplate = {
      page: {
        size: 'A4',
        orientation: 'PORTRAIT',
        margins: { top: 36, bottom: 36, left: 36, right: 36 },
      },
      pages: [
        {
          number: 1,
          fields: [
            {
              id: 'field-1',
              key: 'nomeCliente',
              type: 'TEXT',
              inputMode: 'MANUAL',
              position: { x: 100, y: 150, width: 200, height: 30 },
              validation: { required: true, minLength: 3 },
            },
            {
              id: 'field-2',
              key: 'nomePaciente',
              type: 'TEXT',
              inputMode: 'INTEGRATION',
              position: { x: 100, y: 200, width: 200, height: 30 },
            },
          ],
        },
      ],
    };

    const result = service.validate(validTemplate);
    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should reject template with duplicate field keys across pages', () => {
    const duplicateKeyTemplate = {
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
              position: { x: 50, y: 50, width: 100, height: 20 },
            },
          ],
        },
        {
          number: 2,
          fields: [
            {
              id: 'field-2',
              key: 'nomeCliente', // Duplicated key!
              type: 'TEXT',
              inputMode: 'MANUAL',
              position: { x: 50, y: 100, width: 100, height: 20 },
            },
          ],
        },
      ],
    };

    const result = service.validate(duplicateKeyTemplate);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'DUPLICATE_FIELD_KEY')).toBe(true);
  });

  it('should reject template with invalid page size', () => {
    const invalidSizeTemplate = {
      page: { size: 'UNKNOWN_FORMAT', orientation: 'PORTRAIT' },
      pages: [{ number: 1, fields: [] }],
    };

    const result = service.validate(invalidSizeTemplate);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'INVALID_PAGE_SIZE')).toBe(true);
  });

  it('should reject field with negative coordinates or zero dimensions', () => {
    const invalidPositionTemplate = {
      page: { size: 'A4', orientation: 'PORTRAIT' },
      pages: [
        {
          number: 1,
          fields: [
            {
              id: 'field-1',
              key: 'testField',
              type: 'TEXT',
              position: { x: -10, y: 50, width: 0, height: 20 },
            },
          ],
        },
      ],
    };

    const result = service.validate(invalidPositionTemplate);
    expect(result.valid).toBe(false);
    expect(result.errors.some((e) => e.code === 'INVALID_FIELD_POSITION')).toBe(true);
  });
});
