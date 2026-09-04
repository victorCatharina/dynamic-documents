import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CustomFieldDefinition,
  CreateCustomFieldRequest,
  UpdateCustomFieldRequest,
} from '../models/custom-field.model';

@Injectable({
  providedIn: 'root',
})
export class CustomFieldApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/custom-fields`;

  createCustomField(body: CreateCustomFieldRequest): Observable<CustomFieldDefinition> {
    return this.http.post<CustomFieldDefinition>(this.baseUrl, body);
  }

  getCustomFields(): Observable<CustomFieldDefinition[]> {
    return this.http.get<CustomFieldDefinition[]>(this.baseUrl);
  }

  getCustomFieldById(id: string): Observable<CustomFieldDefinition> {
    return this.http.get<CustomFieldDefinition>(`${this.baseUrl}/${id}`);
  }

  updateCustomField(id: string, body: UpdateCustomFieldRequest): Observable<CustomFieldDefinition> {
    return this.http.put<CustomFieldDefinition>(`${this.baseUrl}/${id}`, body);
  }

  deleteCustomField(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
