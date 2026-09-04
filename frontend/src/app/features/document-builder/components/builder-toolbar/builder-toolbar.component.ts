import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { DocumentBuilderFacade } from '../../services/document-builder.facade';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ImportDialogComponent } from '../import-dialog/import-dialog.component';

@Component({
  selector: 'app-builder-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatProgressSpinnerModule,
  ],
  template: `
    <div class="builder-toolbar">
      <!-- Left: Navigation & Document Info -->
      <div class="toolbar-left">
        <a mat-icon-button routerLink="/documents" matTooltip="Voltar para Documentos">
          <mat-icon>arrow_back</mat-icon>
        </a>

        <div class="doc-title-block">
          <span class="doc-name">{{ facade.document()?.name || 'Documento sem título' }}</span>
          <div class="version-badges">
            <span class="version-tag">
              v{{ facade.currentVersion()?.versionNumber || 1 }}
            </span>
            <span
              class="badge"
              [class.badge-published]="facade.currentVersion()?.status === 'PUBLISHED'"
              [class.badge-draft]="facade.currentVersion()?.status === 'DRAFT'"
              [class.badge-archived]="facade.currentVersion()?.status === 'ARCHIVED'"
            >
              {{ facade.currentVersion()?.status || 'DRAFT' }}
            </span>
            @if (facade.isDirty()) {
              <span class="dirty-indicator" matTooltip="Alterações não salvas">• Não salvo</span>
            }
          </div>
        </div>
      </div>

      <!-- Center: History, Zoom & Tools -->
      <div class="toolbar-center">
        <!-- Undo / Redo -->
        <div class="btn-group">
          <button
            mat-icon-button
            [disabled]="!facade.canUndo()"
            (click)="facade.undo()"
            matTooltip="Desfazer (Ctrl+Z)"
          >
            <mat-icon>undo</mat-icon>
          </button>
          <button
            mat-icon-button
            [disabled]="!facade.canRedo()"
            (click)="facade.redo()"
            matTooltip="Refazer (Ctrl+Shift+Z)"
          >
            <mat-icon>redo</mat-icon>
          </button>
        </div>

        <div class="divider"></div>

        <!-- Zoom Controls -->
        <div class="zoom-controls">
          <button
            mat-icon-button
            (click)="zoomOut()"
            [disabled]="facade.zoom() <= 0.5"
            matTooltip="Diminuir Zoom"
          >
            <mat-icon>remove</mat-icon>
          </button>
          <span class="zoom-label" (click)="resetZoom()" matTooltip="Clique para 100%">
            {{ Math.round(facade.zoom() * 100) }}%
          </span>
          <button
            mat-icon-button
            (click)="zoomIn()"
            [disabled]="facade.zoom() >= 2.0"
            matTooltip="Aumentar Zoom"
          >
            <mat-icon>add</mat-icon>
          </button>
        </div>

        <div class="divider"></div>

        <!-- Import Button -->
        <button
          mat-button
          [disabled]="facade.isReadOnly()"
          (click)="openImportDialog()"
          matTooltip="Importar PDF ou DOCX como background"
        >
          <mat-icon>upload_file</mat-icon>
          Importar
        </button>

        <!-- Preview Toggle -->
        <button
          mat-button
          [color]="facade.isPreviewMode() ? 'accent' : ''"
          (click)="facade.togglePreview()"
          matTooltip="Alternar modo de visualização"
        >
          <mat-icon>{{ facade.isPreviewMode() ? 'visibility_off' : 'visibility' }}</mat-icon>
          {{ facade.isPreviewMode() ? 'Editar' : 'Preview' }}
        </button>
      </div>

      <!-- Right: Save & Publish -->
      <div class="toolbar-right">
        @if (facade.isReadOnly()) {
          <div class="readonly-alert">
            <mat-icon>lock</mat-icon>
            <span>Versão Publicada (Somente Leitura)</span>
          </div>
        } @else {
          <button
            mat-stroked-button
            color="primary"
            (click)="onSave()"
            [disabled]="facade.isSaving() || !facade.isDirty()"
            class="save-btn"
          >
            @if (facade.isSaving()) {
              <mat-spinner diameter="16" class="spinner"></mat-spinner>
              <span>Salvando...</span>
            } @else {
              <mat-icon>save</mat-icon>
              <span>Salvar</span>
            }
          </button>

          <button
            mat-flat-button
            color="primary"
            (click)="confirmPublish()"
            class="publish-btn"
          >
            <mat-icon>publish</mat-icon>
            <span>Publicar Versão</span>
          </button>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .builder-toolbar {
        height: 56px;
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        position: sticky;
        top: 0;
        z-index: 100;
        gap: 12px;
      }

      .toolbar-left, .toolbar-center, .toolbar-right {
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .doc-title-block {
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .doc-name {
        font-weight: 600;
        font-size: 0.95rem;
        color: #0f172a;
        max-width: 220px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .version-badges {
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .version-tag {
        font-size: 0.725rem;
        font-weight: 700;
        color: #475569;
        background: #f1f5f9;
        padding: 1px 6px;
        border-radius: 4px;
      }

      .dirty-indicator {
        font-size: 0.75rem;
        font-weight: 600;
        color: #f59e0b;
      }

      .divider {
        width: 1px;
        height: 24px;
        background: #e2e8f0;
        margin: 0 4px;
      }

      .zoom-controls {
        display: flex;
        align-items: center;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 0 2px;
      }

      .zoom-label {
        font-size: 0.8rem;
        font-weight: 600;
        color: #475569;
        min-width: 44px;
        text-align: center;
        cursor: pointer;

        &:hover {
          color: #2563eb;
        }
      }

      .save-btn, .publish-btn {
        height: 38px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 0.875rem;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .readonly-alert {
        display: flex;
        align-items: center;
        gap: 6px;
        background: #fffbeb;
        color: #b45309;
        border: 1px solid #fde68a;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.825rem;
        font-weight: 600;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }

      .spinner {
        display: inline-block;
        margin-right: 6px;
      }
    `,
  ],
})
export class BuilderToolbarComponent {
  readonly facade = inject(DocumentBuilderFacade);
  private readonly dialog = inject(MatDialog);
  readonly Math = Math;

  zoomIn(): void {
    this.facade.setZoom(this.facade.zoom() + 0.15);
  }

  zoomOut(): void {
    this.facade.setZoom(this.facade.zoom() - 0.15);
  }

  resetZoom(): void {
    this.facade.setZoom(1.0);
  }

  onSave(): void {
    this.facade.save().subscribe();
  }

  openImportDialog(): void {
    const doc = this.facade.document();
    if (!doc) return;

    const dialogRef = this.dialog.open(ImportDialogComponent, {
      data: { documentId: doc.id },
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((importedVersion) => {
      if (importedVersion) {
        this.facade.loadDocumentAndVersion(doc.id, importedVersion.id);
      }
    });
  }

  confirmPublish(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Publicar Versão',
        message:
          'Ao publicar esta versão, ela se tornará imutável e estará ativa no formulário público. Versões anteriores publicadas serão arquivadas. Deseja continuar?',
        confirmText: 'Publicar Agora',
        icon: 'publish',
      },
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.facade.publish().subscribe();
      }
    });
  }
}
