import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap, catchError, of } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';
import { LoginRequest, UserProfile } from '../models/auth.model';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly authApi = inject(AuthApiService);
  private readonly router = inject(Router);
  private readonly notification = inject(NotificationService);

  private readonly TOKEN_KEY = 'portal_doc_jwt';
  private readonly USER_KEY = 'portal_doc_user';

  private readonly _accessToken = signal<string | null>(this.getStoredToken());
  private readonly _currentUser = signal<UserProfile | null>(this.getStoredUser());

  readonly accessToken = this._accessToken.asReadonly();
  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._accessToken());

  login(credentials: LoginRequest) {
    return this.authApi.login(credentials).pipe(
      tap((res) => {
        this.setSession(res.accessToken, res.user);
        this.notification.success('Login realizado com sucesso!');
        this.router.navigate(['/documents']);
      })
    );
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
    this.notification.info('Sessão encerrada.');
  }

  loadProfile(): void {
    if (!this._accessToken()) return;

    this.authApi
      .getProfile()
      .pipe(
        tap((user) => {
          this._currentUser.set(user);
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }),
        catchError(() => {
          this.logout();
          return of(null);
        })
      )
      .subscribe();
  }

  getToken(): string | null {
    return this._accessToken();
  }

  private setSession(token: string, user: UserProfile): void {
    this._accessToken.set(token);
    this._currentUser.set(user);
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private clearSession(): void {
    this._accessToken.set(null);
    this._currentUser.set(null);
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  private getStoredToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private getStoredUser(): UserProfile | null {
    const raw = localStorage.getItem(this.USER_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as UserProfile;
    } catch {
      return null;
    }
  }
}
