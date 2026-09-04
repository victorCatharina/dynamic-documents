import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { DocumentVersion } from '../models/document.model';

@Injectable({
  providedIn: 'root',
})
export class ImportApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/documents`;

  importPdf(documentId: string, file: File): Observable<DocumentVersion> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<DocumentVersion>(`${this.baseUrl}/${documentId}/import/pdf`, formData);
  }

  importDocx(documentId: string, file: File): Observable<DocumentVersion> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<DocumentVersion>(`${this.baseUrl}/${documentId}/import/docx`, formData);
  }
}
