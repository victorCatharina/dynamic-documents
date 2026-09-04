import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  PublicFormSchemaResponse,
  SubmissionCreatedResponse,
} from '../models/submission.model';

@Injectable({
  providedIn: 'root',
})
export class PublicFormApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/public/forms`;

  getPublicForm(publicToken: string): Observable<PublicFormSchemaResponse> {
    return this.http.get<PublicFormSchemaResponse>(`${this.baseUrl}/${publicToken}`);
  }

  submitPublicForm(
    publicToken: string,
    data: Record<string, unknown>
  ): Observable<SubmissionCreatedResponse> {
    return this.http.post<SubmissionCreatedResponse>(
      `${this.baseUrl}/${publicToken}/submissions`,
      { data }
    );
  }
}
