import { toast } from './toast';

export class ApiClient {
  private baseUrl = '/api/v1';

  getToken(): string | null {
    return localStorage.getItem('dd_access_token');
  }

  setToken(token: string) {
    localStorage.setItem('dd_access_token', token);
  }

  removeToken() {
    localStorage.removeItem('dd_access_token');
    localStorage.removeItem('dd_user_profile');
  }

  getUser() {
    const raw = localStorage.getItem('dd_user_profile');
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  setUser(user: any) {
    localStorage.setItem('dd_user_profile', JSON.stringify(user));
  }

  private async request<T = any>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {
      ...((options.headers as Record<string, string>) || {}),
    };

    if (token && !headers['Authorization']) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    if (!(options.body instanceof FormData) && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers,
    });

    if (response.status === 401 && !path.includes('/auth/login') && !path.includes('/public/')) {
      this.removeToken();
      window.location.hash = '#/login';
      toast.error('Sessão expirada. Faça login novamente.');
      throw new Error('Unauthorized');
    }

    let data: any = null;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else if (response.status !== 204) {
      data = await response.text();
    }

    if (!response.ok) {
      const errorMsg =
        data?.message ||
        (Array.isArray(data?.errors)
          ? data.errors.map((e: any) => e.message).join(', ')
          : 'Erro ao processar requisição');
      throw new Error(errorMsg);
    }

    return data as T;
  }

  // Auth
  async login(email: string, password: string) {
    const res = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(res.accessToken);
    this.setUser(res.user);
    return res;
  }

  async getProfile() {
    return this.request('/auth/me');
  }

  // Documents
  async getDocuments(params: { page?: number; limit?: number; search?: string; status?: string } = {}) {
    const q = new URLSearchParams();
    if (params.page) q.append('page', String(params.page));
    if (params.limit) q.append('limit', String(params.limit));
    if (params.search) q.append('search', params.search);
    if (params.status) q.append('status', params.status);
    return this.request(`/documents?${q.toString()}`);
  }

  async getDocument(id: string) {
    return this.request(`/documents/${id}`);
  }

  async createDocument(data: { name: string; description?: string }) {
    return this.request('/documents', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateDocument(id: string, data: { name?: string; description?: string }) {
    return this.request(`/documents/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteDocument(id: string) {
    return this.request(`/documents/${id}`, { method: 'DELETE' });
  }

  async getSchema(id: string) {
    return this.request(`/documents/${id}/schema`);
  }

  // Versions
  async getVersions(documentId: string) {
    return this.request(`/documents/${documentId}/versions`);
  }

  async getVersion(documentId: string, versionId: string) {
    return this.request(`/documents/${documentId}/versions/${versionId}`);
  }

  async createVersion(documentId: string, data: { sourceVersionId?: string; template?: any } = {}) {
    return this.request(`/documents/${documentId}/versions`, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateVersion(documentId: string, versionId: string, template: any) {
    return this.request(`/documents/${documentId}/versions/${versionId}`, {
      method: 'PUT',
      body: JSON.stringify({ template }),
    });
  }

  async publishVersion(documentId: string, versionId: string) {
    return this.request(`/documents/${documentId}/versions/${versionId}/publish`, {
      method: 'POST',
    });
  }

  // Custom Fields
  async getCustomFields() {
    return this.request('/custom-fields');
  }

  async createCustomField(data: any) {
    return this.request('/custom-fields', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCustomField(id: string, data: any) {
    return this.request(`/custom-fields/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCustomField(id: string) {
    return this.request(`/custom-fields/${id}`, { method: 'DELETE' });
  }

  // Submissions
  async createDocumentSubmission(documentId: string, data: Record<string, any>) {
    return this.request(`/documents/${documentId}/submissions`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  async getSubmissions(params: { page?: number; limit?: number; documentId?: string } = {}) {
    const q = new URLSearchParams();
    if (params.page) q.append('page', String(params.page));
    if (params.limit) q.append('limit', String(params.limit));
    if (params.documentId) q.append('documentId', params.documentId);
    return this.request(`/submissions?${q.toString()}`);
  }

  async getSubmission(id: string) {
    return this.request(`/submissions/${id}`);
  }

  // Public Forms
  async getPublicForm(publicToken: string) {
    return this.request(`/public/forms/${publicToken}`);
  }

  async submitPublicForm(publicToken: string, data: Record<string, any>) {
    return this.request(`/public/forms/${publicToken}/submissions`, {
      method: 'POST',
      body: JSON.stringify({ data }),
    });
  }

  // API Keys
  async getApiKeys() {
    return this.request('/api-keys');
  }

  async createApiKey(name: string, expiresAt?: string) {
    return this.request('/api-keys', {
      method: 'POST',
      body: JSON.stringify({ name, expiresAt }),
    });
  }

  async revokeApiKey(id: string) {
    return this.request(`/api-keys/${id}`, { method: 'DELETE' });
  }

  // Import
  async importPdf(documentId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request(`/documents/${documentId}/import/pdf`, {
      method: 'POST',
      body: formData,
    });
  }

  async importDocx(documentId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.request(`/documents/${documentId}/import/docx`, {
      method: 'POST',
      body: formData,
    });
  }
}

export const api = new ApiClient();
