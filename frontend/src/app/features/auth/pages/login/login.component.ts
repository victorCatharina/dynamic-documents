import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from '../../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="login-wrapper">
      <div class="login-card-container">
        <div class="login-header">
          <div class="brand-badge">
            <mat-icon>auto_stories</mat-icon>
          </div>
          <h1>Plataforma de Documentos</h1>
          <p>Acesse o painel administrativo para gerenciar seus templates e documentos</p>
        </div>

        <mat-card class="login-card">
          <mat-card-content>
            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <mat-form-field appearance="outline" class="w-full">
                <mat-label>E-mail</mat-label>
                <input
                  matInput
                  type="email"
                  formControlName="email"
                  placeholder="admin@example.com"
                  autocomplete="email"
                />
                <mat-icon matPrefix class="prefix-icon">email</mat-icon>
                @if (form.get('email')?.hasError('required') && form.get('email')?.touched) {
                  <mat-error>O e-mail é obrigatório</mat-error>
                }
                @if (form.get('email')?.hasError('email') && form.get('email')?.touched) {
                  <mat-error>Insira um e-mail válido</mat-error>
                }
              </mat-form-field>

              <mat-form-field appearance="outline" class="w-full">
                <mat-label>Senha</mat-label>
                <input
                  matInput
                  [type]="hidePassword() ? 'password' : 'text'"
                  formControlName="password"
                  placeholder="••••••••"
                  autocomplete="current-password"
                />
                <mat-icon matPrefix class="prefix-icon">lock</mat-icon>
                <button
                  mat-icon-button
                  matSuffix
                  type="button"
                  (click)="hidePassword.set(!hidePassword())"
                  [attr.aria-label]="'Ocultar senha'"
                >
                  <mat-icon>{{ hidePassword() ? 'visibility_off' : 'visibility' }}</mat-icon>
                </button>
                @if (form.get('password')?.hasError('required') && form.get('password')?.touched) {
                  <mat-error>A senha é obrigatória</mat-error>
                }
              </mat-form-field>

              <button
                mat-flat-button
                color="primary"
                type="submit"
                class="w-full submit-btn"
                [disabled]="form.invalid || isSubmitting()"
              >
                @if (isSubmitting()) {
                  <mat-spinner diameter="20" class="spinner"></mat-spinner>
                  <span>Entrando...</span>
                } @else {
                  <ng-container>
                    <span>Acessar Painel</span>
                    <mat-icon iconPositionEnd>arrow_forward</mat-icon>
                  </ng-container>
                }
              </button>
            </form>
          </mat-card-content>
        </mat-card>

        <div class="login-footer">
          <p>Credenciais padrão de desenvolvimento:</p>
          <code>admin&#64;example.com / password</code>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-wrapper {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
        padding: 24px;
      }

      .login-card-container {
        width: 100%;
        max-width: 440px;
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .login-header {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;

        .brand-badge {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);

          mat-icon {
            font-size: 30px;
            width: 30px;
            height: 30px;
          }
        }

        h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
        }

        p {
          color: #64748b;
          font-size: 0.925rem;
          margin: 0;
          line-height: 1.4;
        }
      }

      .login-card {
        padding: 24px 20px;
        border-radius: 16px;
        border: 1px solid #e2e8f0;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.03);
        background: #ffffff;
      }

      .w-full {
        width: 100%;
        margin-bottom: 8px;
      }

      .prefix-icon {
        color: #94a3b8;
        margin-right: 8px;
      }

      .submit-btn {
        height: 48px;
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: 10px;
        margin-top: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .spinner {
        display: inline-block;
        margin-right: 8px;
      }

      .login-footer {
        text-align: center;
        font-size: 0.825rem;
        color: #64748b;

        p {
          margin-bottom: 4px;
        }

        code {
          background: #e2e8f0;
          padding: 3px 8px;
          border-radius: 6px;
          font-family: 'Roboto Mono', monospace;
          color: #334155;
        }
      }
    `,
  ],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  readonly hidePassword = signal(true);
  readonly isSubmitting = signal(false);

  readonly form: FormGroup = this.fb.group({
    email: ['admin@example.com', [Validators.required, Validators.email]],
    password: ['password', [Validators.required]],
  });

  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.authService.login(this.form.value).subscribe({
      next: () => {
        this.isSubmitting.set(false);
      },
      error: () => {
        this.isSubmitting.set(false);
      },
    });
  }
}
