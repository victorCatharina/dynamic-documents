import { Injectable, BadRequestException } from '@nestjs/common';
import {
  DocumentTemplate,
  DocumentTemplateField,
  DocumentTemplatePage,
  PAGE_DIMENSIONS_PT,
} from './template.types';

export interface TemplateValidationError {
  code: string;
  message: string;
  field?: string;
  page?: number;
  details?: any;
}

export interface TemplateValidationResult {
  valid: boolean;
  errors: TemplateValidationError[];
}

@Injectable()
export class TemplateValidatorService {
  private readonly validPageSizes = ['A4', 'A5', 'LETTER', 'LEGAL'];
  private readonly validOrientations = ['PORTRAIT', 'LANDSCAPE'];
  private readonly validFieldTypes = ['TEXT', 'NUMBER', 'DATE', 'IMAGE', 'FILE'];
  private readonly validFieldInputModes = ['MANUAL', 'INTEGRATION'];

  validate(template: any): TemplateValidationResult {
    const errors: TemplateValidationError[] = [];

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

    // 1. Validar Page Configuration
    if (!template.page || typeof template.page !== 'object') {
      errors.push({
        code: 'MISSING_PAGE_CONFIG',
        message: 'Configuração da página (page) é obrigatória',
      });
    } else {
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

    // 2. Validar Pages
    if (!Array.isArray(template.pages) || template.pages.length === 0) {
      errors.push({
        code: 'EMPTY_PAGES',
        message: 'O template deve conter pelo menos uma página',
      });
      return { valid: errors.length === 0, errors };
    }

    const seenPageNumbers = new Set<number>();
    const seenFieldKeys = new Map<string, { pageNumber: number; fieldId: string }>();

    template.pages.forEach((page: DocumentTemplatePage, pageIndex: number) => {
      const pageNum = page.number ?? pageIndex + 1;

      if (typeof pageNum !== 'number' || pageNum < 1) {
        errors.push({
          code: 'INVALID_PAGE_NUMBER',
          message: `Número de página inválido no índice ${pageIndex}`,
          page: pageNum,
        });
      } else if (seenPageNumbers.has(pageNum)) {
        errors.push({
          code: 'DUPLICATE_PAGE_NUMBER',
          message: `Número de página duplicado: ${pageNum}`,
          page: pageNum,
        });
      } else {
        seenPageNumbers.add(pageNum);
      }

      // Validar Fields da Página
      if (!Array.isArray(page.fields)) {
        errors.push({
          code: 'INVALID_PAGE_FIELDS',
          message: `Campos da página ${pageNum} devem ser um array`,
          page: pageNum,
        });
        return;
      }

      page.fields.forEach((field: DocumentTemplateField, fieldIndex: number) => {
        const fieldId = field.id || `field-${pageIndex}-${fieldIndex}`;

        if (!field.key || typeof field.key !== 'string' || field.key.trim() === '') {
          errors.push({
            code: 'MISSING_FIELD_KEY',
            message: `Campo no índice ${fieldIndex} da página ${pageNum} não possui 'key'`,
            page: pageNum,
          });
        } else {
          // Verificar chave duplicada no template inteiro (Regra da Seção 20)
          if (seenFieldKeys.has(field.key)) {
            const previous = seenFieldKeys.get(field.key)!;
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
          } else {
            seenFieldKeys.set(field.key, { pageNumber: pageNum, fieldId });
          }
        }

        // Validar Tipo do Campo
        if (!this.validFieldTypes.includes(field.type)) {
          errors.push({
            code: 'INVALID_FIELD_TYPE',
            message: `Tipo de campo '${field.type}' inválido. Permitidos: ${this.validFieldTypes.join(', ')}`,
            field: field.key,
            page: pageNum,
          });
        }

        // Validar Input Mode
        if (field.inputMode && !this.validFieldInputModes.includes(field.inputMode)) {
          errors.push({
            code: 'INVALID_INPUT_MODE',
            message: `Modo de entrada '${field.inputMode}' inválido. Permitidos: ${this.validFieldInputModes.join(', ')}`,
            field: field.key,
            page: pageNum,
          });
        }

        // Validar Posição
        if (!field.position || typeof field.position !== 'object') {
          errors.push({
            code: 'MISSING_FIELD_POSITION',
            message: `Posição do campo '${field.key || fieldIndex}' é obrigatória`,
            field: field.key,
            page: pageNum,
          });
        } else {
          const { x, y, width, height } = field.position;
          if (
            typeof x !== 'number' ||
            typeof y !== 'number' ||
            typeof width !== 'number' ||
            typeof height !== 'number' ||
            x < 0 ||
            y < 0 ||
            width <= 0 ||
            height <= 0
          ) {
            errors.push({
              code: 'INVALID_FIELD_POSITION',
              message: `Posição/dimensão inválida para o campo '${field.key}' (x, y >= 0, width, height > 0)`,
              field: field.key,
              page: pageNum,
              details: field.position,
            });
          }
        }

        // Validar Validações do Campo se fornecidas
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

  validateOrThrow(template: any): DocumentTemplate {
    const result = this.validate(template);
    if (!result.valid) {
      throw new BadRequestException({
        statusCode: 400,
        code: 'INVALID_TEMPLATE',
        message: 'Template de documento inválido',
        errors: result.errors,
      });
    }
    return template as DocumentTemplate;
  }
}
