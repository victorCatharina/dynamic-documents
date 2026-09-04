import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ApiKeyApiService } from '../../../../core/api/api-key-api.service';
import { ApiKey } from '../../../../core/models/api-key.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ApiKeyCreateDialogComponent } from '../../components/api-key-create-dialog/api-key-create-dialog.component';

@Component({
  selector: 'app-api-key-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    LoadingSpinnerComponent,
    EmptyStateComponent,
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Chaves de API (Integração)</h1>
          <p class="page-subtitle">
            Gerencie credenciais para permitir preenchimento de documentos e geração de PDFs via backend/REST API.
          </p>
        </div>
        <button mat-flat-button color="primary" (click)="openCreateDialog()">
          <mat-icon>add</mat-icon>
          Gerar Nova Chave
        </button>
      </div>

      @if (isLoading()) {
        <app-loading-spinner message="Carregando chaves de API..."></app-loading-spinner>
      } @else if (apiKeys().length === 0) {
        <div class="empty-container app-card">
          <app-empty-state
            icon="vpn_key"
            title="Nenhuma chave de API configurada"
            description="Crie chaves de autenticação para integrar a plataforma de documentos com seus sistemas externos."
            actionLabel="Gerar Primeira Chave"
            (actionClicked)="openCreateDialog()"
          ></app-empty-state>
        </div>
      } @else {
        <div class="keys-table-card app-card">
          <table mat-table [dataSource]="apiKeys()" class="w-full">
            <!-- Nome Column -->
            <ng-container matColumnDef="name">
              <th mat-header-cell *matHeaderCellDef>Identificação</th>
              <td mat-cell *matCellDef="let key">
                <div class="key-name-cell">
                  <mat-icon class="key-icon">key</mat-icon>
                  <span class="key-name">{{ key.name }}</span>
                </div>
              </td>
            </ng-container>

            <!-- Prefixo Column -->
            <ng-container matColumnDef="keyPrefix">
              <th mat-header-cell *matHeaderCellDef>Prefixo / Token</th>
              <td mat-cell *matCellDef="let key">
                <code class="key-prefix">{{ key.keyPrefix || 'pk_live_••••' }}</code>
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let key">
                <span class="badge badge-published">Ativa</span>
              </td>
            </ng-container>

            <!-- Criada em Column -->
            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Criada em</th>
              <td mat-cell *matCellDef="let key">
                {{ key.createdAt | date: 'dd/MM/yyyy HH:mm' }}
              </td>
            </ng-container>

            <!-- Último Uso Column -->
            <ng-container matColumnDef="lastUsedAt">
              <th mat-header-cell *matHeaderCellDef>Último Uso</th>
              <td mat-cell *matCellDef="let key">
                {{ key.lastUsedAt ? (key.lastUsedAt | date: 'dd/MM/yyyy HH:mm') : 'Nunca utilizada' }}
              </td>
            </ng-container>

            <!-- Ações Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="text-right">Ações</th>
              <td mat-cell *matCellDef="let key" class="text-right">
                <button
                  mat-stroked-button
                  color="warn"
                  (click)="confirmRevoke(key)"
                  matTooltip="Revogar chave de acesso"
                >
                  <mat-icon>block</mat-icon>
                  Revogar
                </button>
              </td>
            </ng-container>

            <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
            <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
          </table>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .page-container {
        display: flex;
        flex-direction: column;
        gap: 24px;
      }

      .page-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .page-title {
        font-size: 1.5rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
      }

      .page-subtitle {
        color: #64748b;
        font-size: 0.9rem;
        margin: 2px 0 0 0;
      }

      .empty-container {
        padding: 32px;
      }

      .keys-table-card {
        padding: 0;
        overflow: hidden;
      }

      .w-full {
        width: 100%;
      }

      .key-name-cell {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .key-icon {
        color: #64748b;
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      .key-name {
        font-weight: 600;
        color: #0f172a;
      }

      .key-prefix {
        font-family: 'Roboto Mono', monospace;
        font-size: 0.8rem;
        background: #f1f5f9;
        color: #475569;
        padding: 3px 8px;
        border-radius: 4px;
      }

      .text-right {
        text-align: right;
      }
    `,
  ],
})
export class ApiKeyListComponent implements OnInit {
  private readonly apiKeyApi = inject(ApiKeyApiService);
  private readonly notification = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  readonly apiKeys = signal<ApiKey[]>([]);
  readonly isLoading = signal<boolean>(true);

  readonly displayedColumns: string[] = ['name', 'keyPrefix', 'status', 'createdAt', 'lastUsedAt', 'actions'];

  ngOnInit(): void {
    this.loadApiKeys();
  }

  loadApiKeys(): void {
    this.isLoading.set(true);
    this.apiKeyApi.getApiKeys().subscribe({
      next: (keys) => {
        this.apiKeys.set(keys);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(ApiKeyCreateDialogComponent);
    dialogRef.afterClosed().subscribe((created) => {
      if (created) {
        this.loadApiKeys();
      }
    });
  }

  confirmRevoke(key: ApiKey): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Revogar Chave de API',
        message: `Tem certeza que deseja revogar a chave "${key.name}"? Qualquer sistema externo utilizando esta chave perderá o acesso imediatamente.`,
        confirmText: 'Revogar Chave',
        isDestructive: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.apiKeyApi.revokeApiKey(key.id).subscribe({
          next: () => {
            this.notification.success('Chave revogada com sucesso.');
            this.loadApiKeys();
          },
        });
      }
    });
  }
}
