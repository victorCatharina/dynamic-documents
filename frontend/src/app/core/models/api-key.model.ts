export interface ApiKey {
  id: string;
  name: string;
  keyPrefix?: string;
  createdAt: string;
  lastUsedAt?: string | null;
  expiresAt?: string | null;
  status?: string;
}

export interface CreateApiKeyRequest {
  name: string;
  expiresAt?: string;
}

export interface CreateApiKeyResponse {
  id: string;
  name: string;
  apiKey: string;
  createdAt: string;
  expiresAt?: string | null;
}
