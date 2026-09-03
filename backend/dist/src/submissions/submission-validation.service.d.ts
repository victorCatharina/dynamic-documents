import { DocumentTemplate } from '../templates/template.types';
export interface FieldValidationError {
    field: string;
    code: string;
    message: string;
    details?: any;
}
export interface SubmissionValidationResult {
    valid: boolean;
    errors: FieldValidationError[];
}
export interface ValidationOptions {
    allowIntegrationFields?: boolean;
}
export declare class SubmissionValidationService {
    validate(template: DocumentTemplate, data?: Record<string, any>, options?: ValidationOptions): SubmissionValidationResult;
    validateOrThrow(template: DocumentTemplate, data: Record<string, any>, options?: ValidationOptions): void;
}
