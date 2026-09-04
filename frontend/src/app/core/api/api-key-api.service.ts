import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiKey, CreateApiKeyRequest, CreateApiKeyResponse } from '../models/api-key.model';

@Injectable({
  providedIn: 'root',
})
export class ApiKeyApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/api-keys`;

  createApiKey(body: CreateApiKeyRequest): Observable<CreateApiKeyResponse> {
    return this.http.post<CreateApiKeyResponse>(this.baseUrl, body);
  }

  getApiKeys(): Observable<ApiKey[]> {
    return this.http.get<ApiKey[]>(this.baseUrl);
  }

  revokeApiKey(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
