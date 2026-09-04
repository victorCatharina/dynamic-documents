import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DocumentVersion } from '../models/document.model';
import { DocumentTemplate } from '../models/template.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentVersionApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/documents`;

  createVersion(
    documentId: string,
    body: { template?: DocumentTemplate; sourceVersionId?: string }
  ): Observable<DocumentVersion> {
    return this.http.post<DocumentVersion>(`${this.baseUrl}/${documentId}/versions`, body);
  }

  getVersions(documentId: string): Observable<DocumentVersion[]> {
    return this.http.get<DocumentVersion[]>(`${this.baseUrl}/${documentId}/versions`);
  }

  getVersionById(documentId: string, versionId: string): Observable<DocumentVersion> {
    return this.http.get<DocumentVersion>(`${this.baseUrl}/${documentId}/versions/${versionId}`);
  }

  updateVersion(
    documentId: string,
    versionId: string,
    template: DocumentTemplate
  ): Observable<DocumentVersion> {
    return this.http.put<DocumentVersion>(
      `${this.baseUrl}/${documentId}/versions/${versionId}`,
      { template }
    );
  }

  publishVersion(documentId: string, versionId: string): Observable<DocumentVersion> {
    return this.http.post<DocumentVersion>(
      `${this.baseUrl}/${documentId}/versions/${versionId}/publish`,
      {}
    );
  }
}
