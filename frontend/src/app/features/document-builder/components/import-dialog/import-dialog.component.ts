import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ImportApiService } from '../../../../core/api/import-api.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-import-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  template: `
    <div class="import-dialog-container">
      <div class="dialog-header">
        <div class="icon-circle">
          <mat-icon>upload_file</mat-icon>
        </div>
        <h2 mat-dialog-title>Importar PDF ou DOCX</h2>
      </div>

      <mat-dialog-content>
        <p class="dialog-desc">
          Selecione um arquivo PDF ou DOCX para converter suas páginas em backgrounds. Uma nova versão do documento será criada com as páginas importadas.
        </p>

        <div
          class="drop-zone"
          [class.has-file]="!!selectedFile()"
          (click)="fileInput.click()"
        >
          <input
            #fileInput
            type="file"
            accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            (change)="onFileSelected($event)"
            style="display: none;"
          />

          @if (!selectedFile()) {
            <mat-icon class="upload-icon">cloud_upload</mat-icon>
            <span class="drop-text">Clique aqui para selecionar o arquivo</span>
            <span class="format-hint">Formatos suportados: .pdf, .docx (máx. 10MB)</span>
          } @else {
            <mat-icon class="file-icon">description</mat-icon>
            <span class="file-name">{{ selectedFile()?.name }}</span>
            <span class="file-size">{{ formatFileSize(selectedFile()?.size || 0) }}</span>
            <button mat-button color="primary" class="change-btn" (click)="$event.stopPropagation(); fileInput.click()">
              Trocar arquivo
            </button>
          }
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()" [disabled]="isUploading()">Cancelar</button>
        <button
          mat-flat-button
          color="primary"
          [disabled]="!selectedFile() || isUploading()"
          (click)="onUpload()"
        >
          @if (isUploading()) {
            <mat-spinner diameter="18" class="spinner"></mat-spinner>
            <span>Processando...</span>
          } @else {
            <mat-icon>file_upload</mat-icon>
            <span>Importar Documento</span>
          }
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .import-dialog-container {
        padding: 8px;
      }

      .dialog-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
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

      .drop-zone {
        border: 2px dashed #cbd5e1;
        border-radius: 12px;
        padding: 32px 16px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background: #f8fafc;
        transition: all 0.2s ease;

        &:hover {
          background: #eff6ff;
          border-color: #3b82f6;
        }

        &.has-file {
          background: #f0fdf4;
          border-color: #86efac;
          border-style: solid;
        }
      }

      .upload-icon {
        font-size: 40px;
        width: 40px;
        height: 40px;
        color: #94a3b8;
        margin-bottom: 8px;
      }

      .drop-text {
        font-weight: 600;
        font-size: 0.925rem;
        color: #1e293b;
      }

      .format-hint {
        font-size: 0.775rem;
        color: #94a3b8;
        margin-top: 4px;
      }

      .file-icon {
        font-size: 36px;
        width: 36px;
        height: 36px;
        color: #16a34a;
        margin-bottom: 6px;
      }

      .file-name {
        font-weight: 600;
        font-size: 0.95rem;
        color: #0f172a;
      }

      .file-size {
        font-size: 0.8rem;
        color: #64748b;
        margin-bottom: 8px;
      }

      .spinner {
        display: inline-block;
        margin-right: 8px;
      }
    `,
  ],
})
export class ImportDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ImportDialogComponent>);
  readonly data: { documentId: string } = inject(MAT_DIALOG_DATA);
  private readonly importApi = inject(ImportApiService);
  private readonly notification = inject(NotificationService);

  readonly selectedFile = signal<File | null>(null);
  readonly isUploading = signal<boolean>(false);

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      if (ext !== 'pdf' && ext !== 'docx') {
        this.notification.error('Apenas arquivos .pdf ou .docx são permitidos.');
        return;
      }
      this.selectedFile.set(file);
    }
  }

  onUpload(): void {
    const file = this.selectedFile();
    if (!file) return;

    this.isUploading.set(true);
    const ext = file.name.split('.').pop()?.toLowerCase();

    const request$ =
      ext === 'docx'
        ? this.importApi.importDocx(this.data.documentId, file)
        : this.importApi.importPdf(this.data.documentId, file);

    request$.subscribe({
      next: (importedVersion) => {
        this.isUploading.set(false);
        this.notification.success('Documento importado com sucesso!');
        this.dialogRef.close(importedVersion);
      },
      error: () => {
        this.isUploading.set(false);
      },
    });
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }
}
