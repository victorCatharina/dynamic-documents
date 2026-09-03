import { DocumentTemplate } from './template.types';
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
export declare class TemplateValidatorService {
    private readonly validPageSizes;
    private readonly validOrientations;
    private readonly validFieldTypes;
    private readonly validFieldInputModes;
    validate(template: any): TemplateValidationResult;
    validateOrThrow(template: any): DocumentTemplate;
}
