import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LoginRequest, LoginResponse, UserProfile } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials);
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/me`);
  }
}
