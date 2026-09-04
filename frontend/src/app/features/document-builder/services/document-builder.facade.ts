import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap, catchError, throwError, forkJoin } from 'rxjs';
import { DocumentBuilderState } from '../state/document-builder.state';
import { DocumentApiService } from '../../../core/api/document-api.service';
import { DocumentVersionApiService } from '../../../core/api/document-version-api.service';
import { NotificationService } from '../../../core/services/notification.service';
import {
  DocumentTemplate,
  DocumentTemplateField,
  DocumentTemplatePage,
  FieldPosition,
  FieldStyle,
  FieldValidation,
  FieldTypeEnum,
  FieldInputModeEnum,
  PageConfiguration,
} from '../../../core/models/template.model';
import { DocumentVersion } from '../../../core/models/document.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentBuilderFacade {
  private readonly state = inject(DocumentBuilderState);
  private readonly documentApi = inject(DocumentApiService);
  private readonly versionApi = inject(DocumentVersionApiService);
  private readonly notification = inject(NotificationService);
  private readonly router = inject(Router);

  // Expose reactive state directly
  readonly document = this.state.document;
  readonly currentVersion = this.state.currentVersion;
  readonly template = this.state.template;
  readonly selectedFieldId = this.state.selectedFieldId;
  readonly selectedPageNumber = this.state.selectedPageNumber;
  readonly selectedField = this.state.selectedField;
  readonly currentPage = this.state.currentPage;
  readonly zoom = this.state.zoom;
  readonly isPreviewMode = this.state.isPreviewMode;
  readonly isDirty = this.state.isDirty;
  readonly isSaving = this.state.isSaving;
  readonly isLoading = this.state.isLoading;
  readonly isReadOnly = this.state.isReadOnly;
  readonly canUndo = this.state.canUndo;
  readonly canRedo = this.state.canRedo;

  loadDocumentAndVersion(documentId: string, versionId?: string): void {
    this.state.isLoading.set(true);

    this.documentApi.getDocumentById(documentId).subscribe({
      next: (doc) => {
        this.state.setDocument(doc);

        const targetVersionId = versionId || (doc.versions && doc.versions.length > 0 ? doc.versions[0].id : null);

        if (targetVersionId) {
          this.versionApi.getVersionById(documentId, targetVersionId).subscribe({
            next: (ver) => {
              const parsedTemplate = this.parseTemplate(ver.template);
              this.state.setCurrentVersion(ver, parsedTemplate);
              this.state.isLoading.set(false);
            },
            error: () => {
              this.state.isLoading.set(false);
              this.notification.error('Erro ao carregar versão do documento.');
            },
          });
        } else {
          // Cria versão inicial se por algum motivo não existir
          this.versionApi.createVersion(documentId, {}).subscribe({
            next: (ver) => {
              const parsedTemplate = this.parseTemplate(ver.template);
              this.state.setCurrentVersion(ver, parsedTemplate);
              this.state.isLoading.set(false);
            },
            error: () => {
              this.state.isLoading.set(false);
            },
          });
        }
      },
      error: () => {
        this.state.isLoading.set(false);
        this.notification.error('Documento não encontrado.');
        this.router.navigate(['/documents']);
      },
    });
  }

  selectField(fieldId: string | null): void {
    this.state.selectField(fieldId);
  }

  selectPage(pageNumber: number): void {
    this.state.selectPage(pageNumber);
  }

  setZoom(zoomFactor: number): void {
    this.state.setZoom(zoomFactor);
  }

  togglePreview(): void {
    this.state.togglePreview();
  }

  undo(): void {
    this.state.undo();
  }

  redo(): void {
    this.state.redo();
  }

  addField(
    type: FieldTypeEnum,
    customFieldData?: { key: string; label: string; inputMode: FieldInputModeEnum; validation?: FieldValidation; mask?: string },
    pageNumber?: number
  ): DocumentTemplateField {
    if (this.state.isReadOnly()) {
      this.notification.warning('Versões publicadas são somente leitura.');
      return null as any;
    }

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;
    const targetPageNum = pageNumber || this.state.selectedPageNumber();
    let targetPage = currentTemplate.pages.find((p) => p.number === targetPageNum);

    if (!targetPage) {
      targetPage = currentTemplate.pages[0];
    }

    // Gerador de chave única
    const fieldCount = currentTemplate.pages.reduce((acc, p) => acc + p.fields.length, 1);
    const defaultKey = customFieldData?.key || `${type.toLowerCase()}_${fieldCount}`;
    const uniqueKey = this.generateUniqueKey(currentTemplate, defaultKey);

    const newField: DocumentTemplateField = {
      id: `field_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      key: uniqueKey,
      label: customFieldData?.label || `Campo ${type}`,
      type: type,
      inputMode: customFieldData?.inputMode || 'MANUAL',
      position: {
        x: 50 + (fieldCount % 5) * 20,
        y: 60 + (fieldCount % 8) * 30,
        width: type === 'NUMBER' ? 140 : type === 'DATE' ? 150 : 200,
        height: 32,
      },
      style: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#000000',
        bold: false,
        italic: false,
        underline: false,
        alignment: 'LEFT',
        verticalAlignment: 'TOP',
      },
      validation: customFieldData?.validation || { required: false },
      mask: customFieldData?.mask,
    };

    targetPage.fields.push(newField);
    this.state.updateTemplate(currentTemplate);
    this.state.selectField(newField.id);

    return newField;
  }

  removeField(fieldId: string): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;

    for (const page of currentTemplate.pages) {
      const idx = page.fields.findIndex((f) => f.id === fieldId);
      if (idx !== -1) {
        page.fields.splice(idx, 1);
        break;
      }
    }

    this.state.updateTemplate(currentTemplate);
    if (this.state.selectedFieldId() === fieldId) {
      this.state.selectField(null);
    }
  }

  duplicateField(fieldId: string): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;
    let original: DocumentTemplateField | null = null;
    let originalPage: DocumentTemplatePage | null = null;

    for (const page of currentTemplate.pages) {
      const found = page.fields.find((f) => f.id === fieldId);
      if (found) {
        original = found;
        originalPage = page;
        break;
      }
    }

    if (!original || !originalPage) return;

    const copy: DocumentTemplateField = JSON.parse(JSON.stringify(original));
    copy.id = `field_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    copy.key = this.generateUniqueKey(currentTemplate, `${original.key}_copia`);
    copy.label = `${original.label || original.key} (Cópia)`;
    copy.position.x += 15;
    copy.position.y += 15;

    originalPage.fields.push(copy);
    this.state.updateTemplate(currentTemplate);
    this.state.selectField(copy.id);
  }

  moveField(fieldId: string, positionPt: { x: number; y: number }): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;

    for (const page of currentTemplate.pages) {
      const field = page.fields.find((f) => f.id === fieldId);
      if (field) {
        field.position.x = Math.max(0, Math.round(positionPt.x * 100) / 100);
        field.position.y = Math.max(0, Math.round(positionPt.y * 100) / 100);
        break;
      }
    }

    this.state.updateTemplate(currentTemplate);
  }

  resizeField(fieldId: string, sizePt: { width: number; height: number; x?: number; y?: number }): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;

    for (const page of currentTemplate.pages) {
      const field = page.fields.find((f) => f.id === fieldId);
      if (field) {
        field.position.width = Math.max(10, Math.round(sizePt.width * 100) / 100);
        field.position.height = Math.max(10, Math.round(sizePt.height * 100) / 100);
        if (sizePt.x !== undefined) field.position.x = Math.max(0, Math.round(sizePt.x * 100) / 100);
        if (sizePt.y !== undefined) field.position.y = Math.max(0, Math.round(sizePt.y * 100) / 100);
        break;
      }
    }

    this.state.updateTemplate(currentTemplate);
  }

  updateField(fieldId: string, partial: Partial<DocumentTemplateField>): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;

    for (const page of currentTemplate.pages) {
      const field = page.fields.find((f) => f.id === fieldId);
      if (field) {
        Object.assign(field, partial);
        break;
      }
    }

    this.state.updateTemplate(currentTemplate);
  }

  updateFieldStyle(fieldId: string, partialStyle: Partial<FieldStyle>): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;

    for (const page of currentTemplate.pages) {
      const field = page.fields.find((f) => f.id === fieldId);
      if (field) {
        field.style = { ...field.style, ...partialStyle };
        break;
      }
    }

    this.state.updateTemplate(currentTemplate);
  }

  updateFieldValidation(fieldId: string, partialValidation: Partial<FieldValidation>): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;

    for (const page of currentTemplate.pages) {
      const field = page.fields.find((f) => f.id === fieldId);
      if (field) {
        field.validation = { ...field.validation, ...partialValidation };
        break;
      }
    }

    this.state.updateTemplate(currentTemplate);
  }

  addPage(): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;
    const nextNumber = currentTemplate.pages.length + 1;

    currentTemplate.pages.push({
      number: nextNumber,
      fields: [],
    });

    this.state.updateTemplate(currentTemplate);
    this.state.selectPage(nextNumber);
    this.notification.info(`Página ${nextNumber} adicionada.`);
  }

  removePage(pageNumber: number): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;
    if (currentTemplate.pages.length <= 1) {
      this.notification.warning('O documento deve conter pelo menos uma página.');
      return;
    }

    currentTemplate.pages = currentTemplate.pages
      .filter((p) => p.number !== pageNumber)
      .map((p, idx) => ({ ...p, number: idx + 1 }));

    this.state.updateTemplate(currentTemplate);
    this.state.selectPage(1);
    this.notification.info(`Página removida.`);
  }

  setPageConfig(pageConfig: PageConfiguration): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;
    currentTemplate.page = { ...currentTemplate.page, ...pageConfig };
    this.state.updateTemplate(currentTemplate);
  }

  setPageBackground(pageNumber: number, assetId?: string, url?: string): void {
    if (this.state.isReadOnly()) return;

    const currentTemplate = JSON.parse(JSON.stringify(this.state.template())) as DocumentTemplate;
    const page = currentTemplate.pages.find((p) => p.number === pageNumber);

    if (page) {
      if (assetId || url) {
        page.background = { assetId, url };
      } else {
        delete page.background;
      }
      this.state.updateTemplate(currentTemplate);
    }
  }

  save(): Observable<DocumentVersion> {
    const doc = this.state.document();
    const ver = this.state.currentVersion();

    if (!doc || !ver) {
      return throwError(() => new Error('Documento não carregado.'));
    }

    if (this.state.isReadOnly()) {
      this.notification.warning('Esta versão está publicada e não pode ser modificada.');
      return throwError(() => new Error('Versão imutável.'));
    }

    // Validação de chave duplicada no frontend para UX imediata
    const duplicateKey = this.findDuplicateKey(this.state.template());
    if (duplicateKey) {
      this.notification.error(`Chave duplicada encontrada: '${duplicateKey}'. Ajuste antes de salvar.`);
      return throwError(() => new Error(`Chave duplicada: ${duplicateKey}`));
    }

    this.state.isSaving.set(true);

    return this.versionApi.updateVersion(doc.id, ver.id, this.state.template()).pipe(
      tap((updatedVersion) => {
        this.state.currentVersion.set(updatedVersion);
        this.state.resetDirty();
        this.state.isSaving.set(false);
        this.notification.success('Template salvo com sucesso!');
      }),
      catchError((err) => {
        this.state.isSaving.set(false);
        return throwError(() => err);
      })
    );
  }

  publish(): Observable<DocumentVersion> {
    const doc = this.state.document();
    const ver = this.state.currentVersion();

    if (!doc || !ver) {
      return throwError(() => new Error('Documento não carregado.'));
    }

    this.state.isPublishing.set(true);

    return this.versionApi.publishVersion(doc.id, ver.id).pipe(
      tap((publishedVersion) => {
        this.state.currentVersion.set(publishedVersion);
        this.state.resetDirty();
        this.state.isPublishing.set(false);
        this.notification.success(`Versão ${publishedVersion.versionNumber} publicada com sucesso!`);
      }),
      catchError((err) => {
        this.state.isPublishing.set(false);
        return throwError(() => err);
      })
    );
  }

  private parseTemplate(template: unknown): DocumentTemplate {
    if (typeof template === 'string') {
      try {
        return JSON.parse(template) as DocumentTemplate;
      } catch {
        return {
          page: { size: 'A4', orientation: 'PORTRAIT' },
          pages: [{ number: 1, fields: [] }],
        };
      }
    }
    return template as DocumentTemplate;
  }

  private generateUniqueKey(template: DocumentTemplate, baseKey: string): string {
    const sanitized = baseKey.replace(/[^a-zA-Z0-9_]/g, '_');
    let key = sanitized;
    let counter = 1;

    const existingKeys = new Set<string>();
    template.pages.forEach((p) => p.fields.forEach((f) => existingKeys.add(f.key)));

    while (existingKeys.has(key)) {
      key = `${sanitized}_${counter}`;
      counter++;
    }

    return key;
  }

  private findDuplicateKey(template: DocumentTemplate): string | null {
    const seen = new Set<string>();
    for (const page of template.pages) {
      for (const field of page.fields) {
        if (seen.has(field.key)) {
          return field.key;
        }
        seen.add(field.key);
      }
    }
    return null;
  }
}
