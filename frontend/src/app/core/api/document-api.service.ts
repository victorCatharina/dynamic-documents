import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  Document,
  CreateDocumentRequest,
  UpdateDocumentRequest,
  QueryDocumentsParams,
  DocumentSchemaResponse,
} from '../models/document.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/documents`;

  createDocument(body: CreateDocumentRequest): Observable<Document> {
    return this.http.post<Document>(this.baseUrl, body);
  }

  getDocuments(params?: QueryDocumentsParams): Observable<ApiResponse<Document[]>> {
    let httpParams = new HttpParams();
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.limit) httpParams = httpParams.set('limit', params.limit.toString());
    if (params?.search) httpParams = httpParams.set('search', params.search);
    if (params?.status) httpParams = httpParams.set('status', params.status);

    return this.http.get<ApiResponse<Document[]>>(this.baseUrl, { params: httpParams });
  }

  getDocumentById(id: string): Observable<Document> {
    return this.http.get<Document>(`${this.baseUrl}/${id}`);
  }

  updateDocument(id: string, body: UpdateDocumentRequest): Observable<Document> {
    return this.http.put<Document>(`${this.baseUrl}/${id}`, body);
  }

  deleteDocument(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getDocumentSchema(id: string): Observable<DocumentSchemaResponse> {
    return this.http.get<DocumentSchemaResponse>(`${this.baseUrl}/${id}/schema`);
  }
}
