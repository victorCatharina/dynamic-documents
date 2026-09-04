import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ApiKeyApiService } from '../../../../core/api/api-key-api.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { CreateApiKeyResponse } from '../../../../core/models/api-key.model';

@Component({
  selector: 'app-api-key-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="api-key-dialog">
      @if (!createdKey()) {
        <!-- Create Form -->
        <div class="dialog-header">
          <div class="icon-circle">
            <mat-icon>vpn_key</mat-icon>
          </div>
          <h2 mat-dialog-title>Nova Chave de API</h2>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()">
          <mat-dialog-content>
            <p class="dialog-desc">
              Gere uma chave de API para permitir que sistemas externos integrem dados e gerem PDFs diretamente.
            </p>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Nome da Chave / Identificação</mat-label>
              <input
                matInput
                formControlName="name"
                placeholder="Ex: ERP Integração, Portal Médico"
                autofocus
              />
              @if (form.get('name')?.hasError('required') && form.get('name')?.touched) {
                <mat-error>O nome da chave é obrigatório</mat-error>
              }
            </mat-form-field>
          </mat-dialog-content>

          <mat-dialog-actions align="end">
            <button mat-button type="button" (click)="onCancel()">Cancelar</button>
            <button
              mat-flat-button
              color="primary"
              type="submit"
              [disabled]="form.invalid || isCreating()"
            >
              Gerar Chave
            </button>
          </mat-dialog-actions>
        </form>
      } @else {
        <!-- One-Time Display of Created Key -->
        <div class="dialog-header">
          <div class="icon-circle success">
            <mat-icon>check_circle</mat-icon>
          </div>
          <h2 mat-dialog-title>Chave Criada com Sucesso!</h2>
        </div>

        <mat-dialog-content>
          <div class="warning-box">
            <mat-icon>warning</mat-icon>
            <div>
              <strong>Atenção:</strong>
              <p>Copie esta chave agora. Por razões de segurança, ela não será exibida novamente.</p>
            </div>
          </div>

          <div class="key-display-box">
            <code class="key-text">{{ createdKey()?.apiKey }}</code>
            <button mat-icon-button (click)="copyKey()" matTooltip="Copiar Chave">
              <mat-icon>content_copy</mat-icon>
            </button>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-flat-button color="primary" (click)="onClose()">
            Entendi, Fechar
          </button>
        </mat-dialog-actions>
      }
    </div>
  `,
  styles: [
    `
      .api-key-dialog {
        padding: 8px;
        min-width: 440px;
      }

      .dialog-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .icon-circle {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: #eff6ff;
        color: #2563eb;
        display: flex;
        align-items: center;
        justify-content: center;

        &.success {
          background: #ecfdf5;
          color: #059669;
        }
      }

      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .dialog-desc {
        color: #64748b;
        font-size: 0.9rem;
        line-height: 1.45;
        margin-bottom: 16px;
      }

      .w-full {
        width: 100%;
      }

      .warning-box {
        display: flex;
        gap: 10px;
        background: #fffbeb;
        border: 1px solid #fde68a;
        color: #92400e;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 0.85rem;

        p {
          margin: 4px 0 0 0;
        }

        mat-icon {
          color: #d97706;
          font-size: 20px;
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }
      }

      .key-display-box {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #0f172a;
        border-radius: 8px;
        padding: 10px 14px;
        margin-bottom: 8px;

        .key-text {
          color: #38bdf8;
          font-family: 'Roboto Mono', monospace;
          font-size: 0.95rem;
          font-weight: 600;
          word-break: break-all;
        }

        button {
          color: #ffffff;
        }
      }
    `,
  ],
})
export class ApiKeyCreateDialogComponent {
  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<ApiKeyCreateDialogComponent>);
  private readonly apiKeyApi = inject(ApiKeyApiService);
  private readonly notification = inject(NotificationService);

  readonly isCreating = signal<boolean>(false);
  readonly createdKey = signal<CreateApiKeyResponse | null>(null);

  readonly form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
  });

  onSubmit(): void {
    if (this.form.invalid || this.isCreating()) return;

    this.isCreating.set(true);
    this.apiKeyApi.createApiKey(this.form.value).subscribe({
      next: (res) => {
        this.createdKey.set(res);
        this.isCreating.set(false);
      },
      error: () => {
        this.isCreating.set(false);
      },
    });
  }

  copyKey(): void {
    const key = this.createdKey()?.apiKey;
    if (key) {
      navigator.clipboard.writeText(key).then(() => {
        this.notification.success('Chave de API copiada para a área de transferência!');
      });
    }
  }

  onClose(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
