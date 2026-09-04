import { DocumentTemplate } from './template.model';

export type DocumentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface DocumentVersion {
  id: string;
  documentId: string;
  versionNumber: number;
  status: DocumentStatus;
  template: DocumentTemplate | string;
  createdAt: string;
  publishedAt?: string | null;
}

export interface Document {
  id: string;
  name: string;
  description?: string | null;
  status: DocumentStatus;
  publicToken: string;
  publishedVersionId?: string | null;
  accessMode: string;
  createdById?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  versions?: DocumentVersion[];
}

export interface CreateDocumentRequest {
  name: string;
  description?: string;
}

export interface UpdateDocumentRequest {
  name?: string;
  description?: string;
}

export interface QueryDocumentsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: DocumentStatus;
}

export interface DocumentSchemaResponse {
  documentId: string;
  documentName: string;
  version: number;
  versionId: string;
  versionStatus: DocumentStatus;
  fields: {
    id: string;
    key: string;
    label: string;
    type: string;
    inputMode: 'MANUAL' | 'INTEGRATION';
    required: boolean;
    validation: Record<string, unknown>;
    mask?: string | null;
    pageNumber: number;
  }[];
}
