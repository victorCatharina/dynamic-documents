import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { CustomFieldApiService } from '../../../../core/api/custom-field-api.service';
import { CustomFieldDefinition } from '../../../../core/models/custom-field.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CustomFieldDialogComponent } from '../../components/custom-field-dialog/custom-field-dialog.component';

@Component({
  selector: 'app-custom-field-list',
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
          <h1 class="page-title">Campos Personalizados</h1>
          <p class="page-subtitle">
            Catálogo de campos pré-configurados para uso padronizado em templates e integrações.
          </p>
        </div>
        <button mat-flat-button color="primary" (click)="openCreateDialog()">
          <mat-icon>add</mat-icon>
          Novo Campo Personalizado
        </button>
      </div>

      @if (isLoading()) {
        <app-loading-spinner message="Carregando catálogo de campos..."></app-loading-spinner>
      } @else if (customFields().length === 0) {
        <div class="empty-container app-card">
          <app-empty-state
            icon="tune"
            title="Nenhum campo personalizado cadastrado"
            description="Cadastre campos globais para facilitar o posicionamento e integração no editor visual."
            actionLabel="Cadastrar Primeiro Campo"
            (actionClicked)="openCreateDialog()"
          ></app-empty-state>
        </div>
      } @else {
        <div class="fields-table-card app-card">
          <table mat-table [dataSource]="customFields()" class="w-full">
            <!-- Key Column -->
            <ng-container matColumnDef="key">
              <th mat-header-cell *matHeaderCellDef>Chave (Key)</th>
              <td mat-cell *matCellDef="let cf">
                <code class="key-code">{{ cf.key }}</code>
              </td>
            </ng-container>

            <!-- Label Column -->
            <ng-container matColumnDef="label">
              <th mat-header-cell *matHeaderCellDef>Rótulo Amigável</th>
              <td mat-cell *matCellDef="let cf">
                <span class="field-label-text">{{ cf.label }}</span>
              </td>
            </ng-container>

            <!-- Type Column -->
            <ng-container matColumnDef="type">
              <th mat-header-cell *matHeaderCellDef>Tipo</th>
              <td mat-cell *matCellDef="let cf">
                <span class="type-tag">{{ cf.type }}</span>
              </td>
            </ng-container>

            <!-- Modo Column -->
            <ng-container matColumnDef="inputMode">
              <th mat-header-cell *matHeaderCellDef>Modo de Entrada</th>
              <td mat-cell *matCellDef="let cf">
                <span
                  class="badge"
                  [class.badge-integration]="cf.inputMode === 'INTEGRATION'"
                  [class.badge-manual]="cf.inputMode === 'MANUAL'"
                >
                  {{ cf.inputMode === 'INTEGRATION' ? 'Integração (API)' : 'Manual (Público)' }}
                </span>
              </td>
            </ng-container>

            <!-- Criado em Column -->
            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Data de Criação</th>
              <td mat-cell *matCellDef="let cf">
                {{ cf.createdAt | date: 'dd/MM/yyyy HH:mm' }}
              </td>
            </ng-container>

            <!-- Ações Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="text-right">Ações</th>
              <td mat-cell *matCellDef="let cf" class="text-right">
                <div class="actions-cell">
                  <button
                    mat-icon-button
                    (click)="openEditDialog(cf)"
                    matTooltip="Editar campo"
                  >
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button
                    mat-icon-button
                    (click)="confirmDelete(cf)"
                    matTooltip="Excluir campo"
                  >
                    <mat-icon color="warn">delete</mat-icon>
                  </button>
                </div>
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

      .fields-table-card {
        padding: 0;
        overflow: hidden;
      }

      .w-full {
        width: 100%;
      }

      .key-code {
        font-family: 'Roboto Mono', monospace;
        font-size: 0.85rem;
        background: #f1f5f9;
        color: #2563eb;
        padding: 3px 8px;
        border-radius: 4px;
        font-weight: 600;
      }

      .field-label-text {
        font-weight: 500;
        color: #0f172a;
      }

      .type-tag {
        font-size: 0.775rem;
        font-weight: 700;
        color: #475569;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        padding: 2px 6px;
        border-radius: 4px;
      }

      .actions-cell {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 4px;
      }

      .text-right {
        text-align: right;
      }
    `,
  ],
})
export class CustomFieldListComponent implements OnInit {
  private readonly customFieldApi = inject(CustomFieldApiService);
  private readonly notification = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  readonly customFields = signal<CustomFieldDefinition[]>([]);
  readonly isLoading = signal<boolean>(true);

  readonly displayedColumns: string[] = ['key', 'label', 'type', 'inputMode', 'createdAt', 'actions'];

  ngOnInit(): void {
    this.loadCustomFields();
  }

  loadCustomFields(): void {
    this.isLoading.set(true);
    this.customFieldApi.getCustomFields().subscribe({
      next: (fields) => {
        this.customFields.set(fields);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CustomFieldDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customFieldApi.createCustomField(result).subscribe({
          next: () => {
            this.notification.success('Campo personalizado cadastrado!');
            this.loadCustomFields();
          },
        });
      }
    });
  }

  openEditDialog(cf: CustomFieldDefinition): void {
    const dialogRef = this.dialog.open(CustomFieldDialogComponent, {
      data: cf,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.customFieldApi.updateCustomField(cf.id, result).subscribe({
          next: () => {
            this.notification.success('Campo atualizado com sucesso!');
            this.loadCustomFields();
          },
        });
      }
    });
  }

  confirmDelete(cf: CustomFieldDefinition): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir Campo Personalizado',
        message: `Deseja excluir o campo "${cf.label}" (${cf.key})? Versões publicadas que já utilizem esta chave não serão afetadas.`,
        confirmText: 'Excluir',
        isDestructive: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.customFieldApi.deleteCustomField(cf.id).subscribe({
          next: () => {
            this.notification.success('Campo excluído com sucesso.');
            this.loadCustomFields();
          },
        });
      }
    });
  }
}
