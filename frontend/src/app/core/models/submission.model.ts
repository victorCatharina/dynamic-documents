export interface Submission {
  id: string;
  documentId: string;
  documentVersionId: string;
  data: string | Record<string, unknown>;
  status: string;
  generatedAssetId?: string | null;
  createdAt: string;
  updatedAt: string;
  document?: {
    id: string;
    name: string;
  };
  documentVersion?: {
    id: string;
    versionNumber: number;
    status: string;
  };
}

export interface SubmissionCreatedResponse {
  submissionId: string;
  status: string;
  downloadUrl: string;
  createdAt: string;
}

export interface PublicFormSchemaResponse {
  documentName: string;
  description?: string;
  publicToken: string;
  version: number;
  fields: {
    id: string;
    key: string;
    label: string;
    type: 'TEXT' | 'NUMBER' | 'DATE' | 'IMAGE' | 'FILE';
    required: boolean;
    validation: {
      required?: boolean;
      minLength?: number;
      maxLength?: number;
      regex?: string;
      min?: number;
      max?: number;
      decimalPlaces?: number;
      minDate?: string;
      maxDate?: string;
    };
    mask?: string | null;
    style?: {
      fontSize?: number;
      alignment?: 'LEFT' | 'CENTER' | 'RIGHT';
    };
    pageNumber: number;
  }[];
}
