import { Injectable, signal, computed } from '@angular/core';
import { Document, DocumentVersion } from '../../../core/models/document.model';
import {
  DocumentTemplate,
  DocumentTemplateField,
  DocumentTemplatePage,
} from '../../../core/models/template.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentBuilderState {
  // Document and Version Data
  readonly document = signal<Document | null>(null);
  readonly currentVersion = signal<DocumentVersion | null>(null);

  // Template State
  readonly template = signal<DocumentTemplate>({
    page: { size: 'A4', orientation: 'PORTRAIT' },
    pages: [{ number: 1, fields: [] }],
  });

  // UI State
  readonly selectedFieldId = signal<string | null>(null);
  readonly selectedPageNumber = signal<number>(1);
  readonly zoom = signal<number>(1); // 1 = 100%
  readonly isPreviewMode = signal<boolean>(false);

  // Status flags
  readonly isDirty = signal<boolean>(false);
  readonly isSaving = signal<boolean>(false);
  readonly isLoading = signal<boolean>(true);
  readonly isPublishing = signal<boolean>(false);

  // History for Undo / Redo
  private readonly undoStack = signal<DocumentTemplate[]>([]);
  private readonly redoStack = signal<DocumentTemplate[]>([]);
  private readonly MAX_HISTORY = 50;

  // Computed Selectors
  readonly isReadOnly = computed(() => {
    const version = this.currentVersion();
    return version?.status === 'PUBLISHED' || version?.status === 'ARCHIVED';
  });

  readonly currentPage = computed<DocumentTemplatePage | null>(() => {
    const t = this.template();
    const pageNum = this.selectedPageNumber();
    return t.pages.find((p) => p.number === pageNum) || t.pages[0] || null;
  });

  readonly selectedField = computed<DocumentTemplateField | null>(() => {
    const fieldId = this.selectedFieldId();
    if (!fieldId) return null;

    for (const page of this.template().pages) {
      const found = page.fields.find((f) => f.id === fieldId);
      if (found) return found;
    }
    return null;
  });

  readonly canUndo = computed(() => this.undoStack().length > 0 && !this.isReadOnly());
  readonly canRedo = computed(() => this.redoStack().length > 0 && !this.isReadOnly());

  // State Mutators
  setDocument(doc: Document): void {
    this.document.set(doc);
  }

  setCurrentVersion(version: DocumentVersion, template: DocumentTemplate): void {
    this.currentVersion.set(version);
    this.template.set(JSON.parse(JSON.stringify(template)));
    this.selectedFieldId.set(null);
    this.selectedPageNumber.set(1);
    this.isDirty.set(false);
    this.undoStack.set([]);
    this.redoStack.set([]);
  }

  updateTemplate(newTemplate: DocumentTemplate, recordHistory = true): void {
    if (recordHistory && !this.isReadOnly()) {
      const current = JSON.parse(JSON.stringify(this.template()));
      this.undoStack.update((stack) => {
        const next = [...stack, current];
        if (next.length > this.MAX_HISTORY) next.shift();
        return next;
      });
      this.redoStack.set([]); // Limpa redo quando há nova ação
    }

    this.template.set(JSON.parse(JSON.stringify(newTemplate)));
    this.isDirty.set(true);
  }

  selectField(fieldId: string | null): void {
    this.selectedFieldId.set(fieldId);
  }

  selectPage(pageNumber: number): void {
    this.selectedPageNumber.set(pageNumber);
  }

  setZoom(zoomFactor: number): void {
    const clamped = Math.min(2.0, Math.max(0.5, zoomFactor));
    this.zoom.set(Math.round(clamped * 100) / 100);
  }

  togglePreview(): void {
    this.isPreviewMode.update((v) => !v);
  }

  undo(): void {
    if (!this.canUndo()) return;

    const stack = [...this.undoStack()];
    const previous = stack.pop();
    if (!previous) return;

    const current = JSON.parse(JSON.stringify(this.template()));
    this.redoStack.update((r) => [...r, current]);
    this.undoStack.set(stack);

    this.template.set(previous);
    this.isDirty.set(true);
  }

  redo(): void {
    if (!this.canRedo()) return;

    const stack = [...this.redoStack()];
    const next = stack.pop();
    if (!next) return;

    const current = JSON.parse(JSON.stringify(this.template()));
    this.undoStack.update((u) => [...u, current]);
    this.redoStack.set(stack);

    this.template.set(next);
    this.isDirty.set(true);
  }

  resetDirty(): void {
    this.isDirty.set(false);
  }
}
