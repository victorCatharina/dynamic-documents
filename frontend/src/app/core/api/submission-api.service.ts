import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Submission } from '../models/submission.model';
import { ApiResponse } from '../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class SubmissionApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/submissions`;

  getSubmissions(params?: {
    page?: number;
    limit?: number;
    documentId?: string;
  }): Observable<ApiResponse<Submission[]>> {
    let httpParams = new HttpParams();
    if (params?.page) httpParams = httpParams.set('page', params.page.toString());
    if (params?.limit) httpParams = httpParams.set('limit', params.limit.toString());
    if (params?.documentId) httpParams = httpParams.set('documentId', params.documentId);

    return this.http.get<ApiResponse<Submission[]>>(this.baseUrl, { params: httpParams });
  }

  getSubmissionById(id: string): Observable<Submission> {
    return this.http.get<Submission>(`${this.baseUrl}/${id}`);
  }

  getSubmissionDocumentUrl(id: string): string {
    return `${this.baseUrl}/${id}/document`;
  }
}
