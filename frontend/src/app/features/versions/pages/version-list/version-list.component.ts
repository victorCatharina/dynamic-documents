import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DocumentApiService } from '../../../../core/api/document-api.service';
import { DocumentVersionApiService } from '../../../../core/api/document-version-api.service';
import { Document, DocumentVersion } from '../../../../core/models/document.model';
import { NotificationService } from '../../../../core/services/notification.service';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-version-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    LoadingSpinnerComponent,
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div class="header-left">
          <a mat-icon-button routerLink="/documents" matTooltip="Voltar aos documentos">
            <mat-icon>arrow_back</mat-icon>
          </a>
          <div>
            <h1 class="page-title">Histórico de Versões</h1>
            <p class="page-subtitle">
              Documento: <strong>{{ document()?.name }}</strong>
            </p>
          </div>
        </div>

        <button mat-flat-button color="primary" (click)="createNewVersion()">
          <mat-icon>add</mat-icon>
          Nova Versão (Rascunho)
        </button>
      </div>

      @if (isLoading()) {
        <app-loading-spinner message="Carregando versões do documento..."></app-loading-spinner>
      } @else {
        <div class="versions-table-card app-card">
          <table mat-table [dataSource]="versions()" class="w-full">
            <!-- Versão Column -->
            <ng-container matColumnDef="versionNumber">
              <th mat-header-cell *matHeaderCellDef>Versão</th>
              <td mat-cell *matCellDef="let ver">
                <div class="version-cell">
                  <span class="version-badge-big">v{{ ver.versionNumber }}</span>
                  @if (document()?.publishedVersionId === ver.id) {
                    <span class="active-tag">Ativa no link público</span>
                  }
                </div>
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let ver">
                <span
                  class="badge"
                  [class.badge-published]="ver.status === 'PUBLISHED'"
                  [class.badge-draft]="ver.status === 'DRAFT'"
                  [class.badge-archived]="ver.status === 'ARCHIVED'"
                >
                  {{ ver.status === 'PUBLISHED' ? 'Publicada' : ver.status === 'DRAFT' ? 'Rascunho' : 'Arquivada' }}
                </span>
              </td>
            </ng-container>

            <!-- Criada em Column -->
            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Criada em</th>
              <td mat-cell *matCellDef="let ver">
                {{ ver.createdAt | date: 'dd/MM/yyyy HH:mm' }}
              </td>
            </ng-container>

            <!-- Publicada em Column -->
            <ng-container matColumnDef="publishedAt">
              <th mat-header-cell *matHeaderCellDef>Publicada em</th>
              <td mat-cell *matCellDef="let ver">
                {{ ver.publishedAt ? (ver.publishedAt | date: 'dd/MM/yyyy HH:mm') : '—' }}
              </td>
            </ng-container>

            <!-- Ações Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="text-right">Ações</th>
              <td mat-cell *matCellDef="let ver" class="text-right">
                <div class="actions-cell">
                  <!-- Open in Builder -->
                  <a
                    mat-stroked-button
                    [color]="ver.status === 'DRAFT' ? 'primary' : ''"
                    [routerLink]="['/documents', document()?.id, 'builder', ver.id]"
                  >
                    <mat-icon>{{ ver.status === 'DRAFT' ? 'edit' : 'visibility' }}</mat-icon>
                    {{ ver.status === 'DRAFT' ? 'Editar no Builder' : 'Visualizar' }}
                  </a>

                  <!-- Duplicate -->
                  <button
                    mat-icon-button
                    (click)="duplicateVersion(ver)"
                    matTooltip="Duplicar como nova versão"
                  >
                    <mat-icon>content_copy</mat-icon>
                  </button>

                  <!-- Publish -->
                  @if (ver.status === 'DRAFT') {
                    <button
                      mat-flat-button
                      color="primary"
                      (click)="publishVersion(ver)"
                      matTooltip="Publicar esta versão"
                    >
                      <mat-icon>publish</mat-icon>
                      Publicar
                    </button>
                  }
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

      .header-left {
        display: flex;
        align-items: center;
        gap: 12px;
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

      .versions-table-card {
        padding: 0;
        overflow: hidden;
      }

      .w-full {
        width: 100%;
      }

      .version-cell {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .version-badge-big {
        font-weight: 700;
        font-size: 0.95rem;
        color: #1e293b;
      }

      .active-tag {
        font-size: 0.725rem;
        font-weight: 600;
        color: #059669;
        background: #ecfdf5;
        border: 1px solid #a7f3d0;
        padding: 2px 8px;
        border-radius: 9999px;
      }

      .actions-cell {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 8px;
      }

      .text-right {
        text-align: right;
      }
    `,
  ],
})
export class VersionListComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly documentApi = inject(DocumentApiService);
  private readonly versionApi = inject(DocumentVersionApiService);
  private readonly notification = inject(NotificationService);
  private readonly dialog = inject(MatDialog);

  readonly document = signal<Document | null>(null);
  readonly versions = signal<DocumentVersion[]>([]);
  readonly isLoading = signal<boolean>(true);

  readonly displayedColumns: string[] = ['versionNumber', 'status', 'createdAt', 'publishedAt', 'actions'];

  ngOnInit(): void {
    const documentId = this.route.snapshot.paramMap.get('documentId') || this.route.snapshot.paramMap.get('id');
    if (documentId) {
      this.loadData(documentId);
    }
  }

  loadData(documentId: string): void {
    this.isLoading.set(true);
    this.documentApi.getDocumentById(documentId).subscribe({
      next: (doc) => {
        this.document.set(doc);
        this.versionApi.getVersions(documentId).subscribe({
          next: (vers) => {
            this.versions.set(vers);
            this.isLoading.set(false);
          },
          error: () => this.isLoading.set(false),
        });
      },
      error: () => {
        this.isLoading.set(false);
        this.notification.error('Documento não encontrado.');
        this.router.navigate(['/documents']);
      },
    });
  }

  createNewVersion(): void {
    const doc = this.document();
    if (!doc) return;

    this.versionApi.createVersion(doc.id, {}).subscribe({
      next: (ver) => {
        this.notification.success(`Versão ${ver.versionNumber} criada!`);
        this.router.navigate(['/documents', doc.id, 'builder', ver.id]);
      },
    });
  }

  duplicateVersion(ver: DocumentVersion): void {
    const doc = this.document();
    if (!doc) return;

    this.versionApi.createVersion(doc.id, { sourceVersionId: ver.id }).subscribe({
      next: (newVer) => {
        this.notification.success(`Versão ${newVer.versionNumber} criada com base na v${ver.versionNumber}!`);
        this.router.navigate(['/documents', doc.id, 'builder', newVer.id]);
      },
    });
  }

  publishVersion(ver: DocumentVersion): void {
    const doc = this.document();
    if (!doc) return;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Publicar Versão',
        message: `Deseja publicar a versão ${ver.versionNumber}? Ela se tornará a versão ativa do formulário público.`,
        confirmText: 'Publicar',
        icon: 'publish',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.versionApi.publishVersion(doc.id, ver.id).subscribe({
          next: () => {
            this.notification.success(`Versão ${ver.versionNumber} publicada com sucesso!`);
            this.loadData(doc.id);
          },
        });
      }
    });
  }
}
