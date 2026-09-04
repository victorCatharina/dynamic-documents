import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { DocumentApiService } from '../../../../core/api/document-api.service';
import { Document, DocumentStatus } from '../../../../core/models/document.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DocumentCreateDialogComponent } from '../../components/document-create-dialog/document-create-dialog.component';
import { DocumentEditDialogComponent } from '../../components/document-edit-dialog/document-edit-dialog.component';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    MatTooltipModule,
    MatDividerModule,
    LoadingSpinnerComponent,
    EmptyStateComponent,
  ],
  template: `
    <div class="page-container">
      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Documentos</h1>
          <p class="page-subtitle">
            Crie templates dinâmicos, configure páginas, versione e gere links públicos de preenchimento.
          </p>
        </div>
        <button mat-flat-button color="primary" class="create-btn" (click)="openCreateDialog()">
          <mat-icon>add</mat-icon>
          Novo Documento
        </button>
      </div>

      <!-- Filters & Search Bar -->
      <div class="filters-card app-card">
        <div class="search-box">
          <mat-icon class="search-icon">search</mat-icon>
          <input
            type="text"
            [(ngModel)]="searchQuery"
            (ngModelChange)="onSearchChange()"
            placeholder="Buscar documento por título ou descrição..."
            class="search-input"
          />
          @if (searchQuery) {
            <button mat-icon-button (click)="searchQuery = ''; onSearchChange()">
              <mat-icon>close</mat-icon>
            </button>
          }
        </div>

        <div class="status-filters">
          <button
            class="filter-pill"
            [class.active]="selectedStatus === null"
            (click)="setStatusFilter(null)"
          >
            Todos
          </button>
          <button
            class="filter-pill"
            [class.active]="selectedStatus === 'PUBLISHED'"
            (click)="setStatusFilter('PUBLISHED')"
          >
            Publicados
          </button>
          <button
            class="filter-pill"
            [class.active]="selectedStatus === 'DRAFT'"
            (click)="setStatusFilter('DRAFT')"
          >
            Rascunhos
          </button>
        </div>
      </div>

      <!-- Content Area -->
      @if (isLoading()) {
        <app-loading-spinner message="Carregando documentos..."></app-loading-spinner>
      } @else if (documents().length === 0) {
        <div class="empty-container app-card">
          <app-empty-state
            icon="description"
            title="Nenhum documento encontrado"
            description="Comece criando seu primeiro documento dinâmico para montar templates e publicar."
            actionLabel="Criar Documento"
            (actionClicked)="openCreateDialog()"
          ></app-empty-state>
        </div>
      } @else {
        <div class="documents-grid">
          @for (doc of documents(); track doc.id) {
            <div class="doc-card app-card">
              <div class="doc-card-header">
                <div class="doc-info">
                  <div class="doc-badges">
                    <span
                      class="badge"
                      [class.badge-published]="doc.status === 'PUBLISHED'"
                      [class.badge-draft]="doc.status === 'DRAFT'"
                      [class.badge-archived]="doc.status === 'ARCHIVED'"
                    >
                      {{ getStatusLabel(doc.status) }}
                    </span>
                    @if (doc.versions && doc.versions.length > 0) {
                      <span class="version-badge">
                        v{{ doc.versions[0].versionNumber }} ({{ doc.versions.length }} {{ doc.versions.length === 1 ? 'versão' : 'versões' }})
                      </span>
                    }
                  </div>
                  <h3 class="doc-title" [title]="doc.name">{{ doc.name }}</h3>
                </div>

                <button mat-icon-button [matMenuTriggerFor]="docMenu" aria-label="Ações do documento">
                  <mat-icon>more_vert</mat-icon>
                </button>

                <mat-menu #docMenu="matMenu" xPosition="before">
                  <button mat-menu-item [routerLink]="['/documents', doc.id, 'builder']">
                    <mat-icon color="primary">palette</mat-icon>
                    <span>Abrir no Builder</span>
                  </button>
                  <button mat-menu-item [routerLink]="['/documents', doc.id, 'versions']">
                    <mat-icon>history</mat-icon>
                    <span>Histórico de Versões</span>
                  </button>
                  <button mat-menu-item [routerLink]="['/documents', doc.id, 'submissions']">
                    <mat-icon>assignment_turned_in</mat-icon>
                    <span>Ver Submissões</span>
                  </button>
                  <button mat-menu-item (click)="openEditDialog(doc)">
                    <mat-icon>edit</mat-icon>
                    <span>Editar Metadados</span>
                  </button>
                  <mat-divider></mat-divider>
                  <button mat-menu-item (click)="confirmDelete(doc)">
                    <mat-icon color="warn">delete</mat-icon>
                    <span>Excluir Documento</span>
                  </button>
                </mat-menu>
              </div>

              <p class="doc-description">
                {{ doc.description || 'Sem descrição informada.' }}
              </p>

              <div class="doc-footer">
                <div class="doc-meta">
                  <span class="meta-item">
                    <mat-icon>update</mat-icon>
                    {{ doc.updatedAt | date: 'dd/MM/yyyy HH:mm' }}
                  </span>
                </div>

                <div class="doc-actions">
                  @if (doc.status === 'PUBLISHED') {
                    <button
                      mat-icon-button
                      color="accent"
                      matTooltip="Copiar link do formulário público"
                      (click)="copyPublicUrl(doc.publicToken)"
                    >
                      <mat-icon>link</mat-icon>
                    </button>
                  }
                  <a
                    mat-flat-button
                    color="primary"
                    [routerLink]="['/documents', doc.id, 'builder']"
                    class="open-builder-btn"
                  >
                    <mat-icon>palette</mat-icon>
                    Builder
                  </a>
                </div>
              </div>
            </div>
          }
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
        gap: 16px;
      }

      .page-title {
        font-size: 1.75rem;
        font-weight: 700;
        color: #0f172a;
        margin: 0;
      }

      .page-subtitle {
        color: #64748b;
        font-size: 0.95rem;
        margin: 4px 0 0 0;
      }

      .create-btn {
        height: 44px;
        padding: 0 20px;
        font-weight: 600;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .filters-card {
        padding: 12px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }

      .search-box {
        display: flex;
        align-items: center;
        gap: 8px;
        flex: 1;
        min-width: 260px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 0 12px;
        height: 40px;
      }

      .search-icon {
        color: #94a3b8;
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      .search-input {
        border: none;
        background: transparent;
        outline: none;
        width: 100%;
        font-size: 0.9rem;
        color: #1e293b;

        &::placeholder {
          color: #94a3b8;
        }
      }

      .status-filters {
        display: flex;
        gap: 8px;
      }

      .filter-pill {
        background: transparent;
        border: 1px solid #cbd5e1;
        padding: 6px 14px;
        border-radius: 9999px;
        font-size: 0.825rem;
        font-weight: 500;
        color: #475569;
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover {
          background: #f1f5f9;
          border-color: #94a3b8;
        }

        &.active {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }
      }

      .empty-container {
        padding: 24px;
      }

      .documents-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        gap: 20px;
      }

      .doc-card {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 210px;
      }

      .doc-card-header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 8px;
      }

      .doc-badges {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 6px;
      }

      .version-badge {
        font-size: 0.75rem;
        font-weight: 600;
        color: #64748b;
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
      }

      .doc-title {
        font-size: 1.1rem;
        font-weight: 600;
        color: #0f172a;
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 240px;
      }

      .doc-description {
        font-size: 0.875rem;
        color: #64748b;
        line-height: 1.45;
        margin: 8px 0;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .doc-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 12px;
        border-top: 1px solid #f1f5f9;
      }

      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 0.775rem;
        color: #94a3b8;

        mat-icon {
          font-size: 16px;
          width: 16px;
          height: 16px;
        }
      }

      .doc-actions {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .open-builder-btn {
        height: 36px;
        font-size: 0.85rem;
        font-weight: 600;
        border-radius: 6px;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    `,
  ],
})
export class DocumentListComponent implements OnInit {
  private readonly documentApi = inject(DocumentApiService);
  private readonly notification = inject(NotificationService);
  private readonly dialog = inject(MatDialog);
  private readonly router = inject(Router);

  readonly documents = signal<Document[]>([]);
  readonly isLoading = signal<boolean>(true);

  searchQuery = '';
  selectedStatus: DocumentStatus | null = null;

  ngOnInit(): void {
    this.loadDocuments();
  }

  loadDocuments(): void {
    this.isLoading.set(true);
    this.documentApi
      .getDocuments({
        search: this.searchQuery || undefined,
        status: this.selectedStatus || undefined,
      })
      .subscribe({
        next: (res) => {
          this.documents.set(res.data);
          this.isLoading.set(false);
        },
        error: () => {
          this.isLoading.set(false);
        },
      });
  }

  onSearchChange(): void {
    this.loadDocuments();
  }

  setStatusFilter(status: DocumentStatus | null): void {
    this.selectedStatus = status;
    this.loadDocuments();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(DocumentCreateDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.documentApi.createDocument(result).subscribe({
          next: (doc) => {
            this.notification.success('Documento criado com sucesso!');
            this.router.navigate(['/documents', doc.id, 'builder']);
          },
        });
      }
    });
  }

  openEditDialog(doc: Document): void {
    const dialogRef = this.dialog.open(DocumentEditDialogComponent, {
      data: doc,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.documentApi.updateDocument(doc.id, result).subscribe({
          next: () => {
            this.notification.success('Metadados atualizados!');
            this.loadDocuments();
          },
        });
      }
    });
  }

  confirmDelete(doc: Document): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir Documento',
        message: `Tem certeza que deseja excluir o documento "${doc.name}"? Esta ação removerá o acesso ao link público e histórico de versões.`,
        confirmText: 'Excluir',
        isDestructive: true,
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.documentApi.deleteDocument(doc.id).subscribe({
          next: () => {
            this.notification.success('Documento excluído com sucesso.');
            this.loadDocuments();
          },
        });
      }
    });
  }

  copyPublicUrl(token: string): void {
    const url = `${environment.publicFormBaseUrl}/${token}`;
    navigator.clipboard.writeText(url).then(() => {
      this.notification.success('Link do formulário público copiado para a área de transferência!');
    });
  }

  getStatusLabel(status: DocumentStatus): string {
    switch (status) {
      case 'PUBLISHED':
        return 'Publicado';
      case 'DRAFT':
        return 'Rascunho';
      case 'ARCHIVED':
        return 'Arquivado';
      default:
        return status;
    }
  }
}
