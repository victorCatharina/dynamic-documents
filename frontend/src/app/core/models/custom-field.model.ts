import { FieldInputModeEnum, FieldTypeEnum } from './template.model';

export interface CustomFieldDefinition {
  id: string;
  key: string;
  label: string;
  type: FieldTypeEnum;
  inputMode: FieldInputModeEnum;
  validation?: string | Record<string, unknown> | null;
  formatting?: string | Record<string, unknown> | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCustomFieldRequest {
  key: string;
  label: string;
  type?: FieldTypeEnum;
  inputMode?: FieldInputModeEnum;
  validation?: string | Record<string, unknown>;
  formatting?: string | Record<string, unknown>;
}

export interface UpdateCustomFieldRequest {
  label?: string;
  type?: FieldTypeEnum;
  inputMode?: FieldInputModeEnum;
  validation?: string | Record<string, unknown>;
  formatting?: string | Record<string, unknown>;
}
