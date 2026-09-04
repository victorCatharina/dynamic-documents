import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DocumentBuilderFacade } from '../../services/document-builder.facade';
import { BuilderToolbarComponent } from '../../components/builder-toolbar/builder-toolbar.component';
import { FieldPaletteComponent } from '../../components/field-palette/field-palette.component';
import { DocumentCanvasComponent } from '../../components/document-canvas/document-canvas.component';
import { FieldPropertiesPanelComponent } from '../../components/field-properties-panel/field-properties-panel.component';
import { PagePropertiesPanelComponent } from '../../components/page-properties-panel/page-properties-panel.component';
import { BuilderPreviewComponent } from '../../components/builder-preview/builder-preview.component';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { CanComponentDeactivate } from '../../../../core/auth/unsaved-changes.guard';

@Component({
  selector: 'app-document-builder',
  standalone: true,
  imports: [
    CommonModule,
    BuilderToolbarComponent,
    FieldPaletteComponent,
    DocumentCanvasComponent,
    FieldPropertiesPanelComponent,
    PagePropertiesPanelComponent,
    BuilderPreviewComponent,
    LoadingSpinnerComponent,
  ],
  template: `
    <div class="builder-container">
      @if (facade.isLoading()) {
        <app-loading-spinner message="Carregando editor de documento..."></app-loading-spinner>
      } @else {
        <!-- Top Toolbar -->
        <app-builder-toolbar></app-builder-toolbar>

        <!-- Main Workspace (3-column layout) -->
        <div class="builder-workspace">
          <!-- Left: Field & Component Palette -->
          <app-field-palette></app-field-palette>

          <!-- Center: Document Canvas Viewport -->
          <app-document-canvas></app-document-canvas>

          <!-- Right: Contextual Properties Panel -->
          @if (facade.selectedField()) {
            <app-field-properties-panel></app-field-properties-panel>
          } @else {
            <app-page-properties-panel></app-page-properties-panel>
          }
        </div>

        <!-- Fullscreen Preview Overlay -->
        @if (facade.isPreviewMode()) {
          <app-builder-preview></app-builder-preview>
        }
      }
    </div>
  `,
  styles: [
    `
      .builder-container {
        display: flex;
        flex-direction: column;
        height: 100vh;
        width: 100vw;
        overflow: hidden;
        background: #f8fafc;
      }

      .builder-workspace {
        display: flex;
        flex: 1;
        overflow: hidden;
        height: calc(100vh - 56px);
      }
    `,
  ],
})
export class DocumentBuilderComponent implements OnInit, OnDestroy, CanComponentDeactivate {
  readonly facade = inject(DocumentBuilderFacade);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    const documentId = this.route.snapshot.paramMap.get('documentId') || this.route.snapshot.paramMap.get('id');
    const versionId = this.route.snapshot.paramMap.get('versionId') || undefined;

    if (documentId) {
      this.facade.loadDocumentAndVersion(documentId, versionId);
    }
  }

  ngOnDestroy(): void {
    // Reset selection
    this.facade.selectField(null);
  }

  canDeactivate(): boolean | Observable<boolean> {
    if (!this.facade.isDirty() || this.facade.isReadOnly()) {
      return true;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Alterações não salvas',
        message:
          'Você possui modificações não salvas no documento. Se você sair agora, as alterações serão descartadas. Deseja sair mesmo assim?',
        confirmText: 'Descartar e Sair',
        cancelText: 'Continuar Editando',
        isDestructive: true,
      },
    });

    return dialogRef.afterClosed();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardShortcuts(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    const isInputActive =
      target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.isContentEditable;

    // Ctrl + S (Save)
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
      if (!this.facade.isReadOnly() && this.facade.isDirty()) {
        this.facade.save().subscribe();
      }
      return;
    }

    // Ctrl + Z (Undo)
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'z' && !event.shiftKey) {
      if (!isInputActive) {
        event.preventDefault();
        this.facade.undo();
      }
      return;
    }

    // Ctrl + Shift + Z ou Ctrl + Y (Redo)
    if (
      ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'z') ||
      ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'y')
    ) {
      if (!isInputActive) {
        event.preventDefault();
        this.facade.redo();
      }
      return;
    }

    // Delete / Backspace (Delete selected field)
    if ((event.key === 'Delete' || event.key === 'Backspace') && !isInputActive) {
      const selectedId = this.facade.selectedFieldId();
      if (selectedId && !this.facade.isReadOnly()) {
        event.preventDefault();
        this.facade.removeField(selectedId);
      }
      return;
    }

    // Ctrl + D (Duplicate field)
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'd' && !isInputActive) {
      const selectedId = this.facade.selectedFieldId();
      if (selectedId && !this.facade.isReadOnly()) {
        event.preventDefault();
        this.facade.duplicateField(selectedId);
      }
      return;
    }

    // Escape (Deselect field)
    if (event.key === 'Escape') {
      this.facade.selectField(null);
    }
  }
}
