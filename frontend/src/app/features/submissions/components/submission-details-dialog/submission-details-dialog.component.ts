import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Submission } from '../../../../core/models/submission.model';
import { SubmissionApiService } from '../../../../core/api/submission-api.service';

@Component({
  selector: 'app-submission-details-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="submission-dialog">
      <div class="dialog-header">
        <div class="icon-circle">
          <mat-icon>assignment_turned_in</mat-icon>
        </div>
        <div>
          <h2 mat-dialog-title>Detalhes da Submissão</h2>
          <span class="sub-id">ID: {{ data.id }}</span>
        </div>
      </div>

      <mat-dialog-content>
        <div class="meta-grid">
          <div class="meta-card">
            <span class="meta-label">Documento</span>
            <span class="meta-value">{{ data.document?.name || 'Documento' }}</span>
          </div>
          <div class="meta-card">
            <span class="meta-label">Versão</span>
            <span class="meta-value">v{{ data.documentVersion?.versionNumber || 1 }}</span>
          </div>
          <div class="meta-card">
            <span class="meta-label">Data de Preenchimento</span>
            <span class="meta-value">{{ data.createdAt | date: 'dd/MM/yyyy HH:mm:ss' }}</span>
          </div>
          <div class="meta-card">
            <span class="meta-label">Status</span>
            <span class="badge badge-published">{{ data.status }}</span>
          </div>
        </div>

        <div class="payload-section">
          <span class="section-title">Dados Enviados (JSON)</span>
          <pre class="json-viewer">{{ getFormattedData() }}</pre>
        </div>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onClose()">Fechar</button>
        <a
          mat-flat-button
          color="primary"
          [href]="submissionApi.getSubmissionDocumentUrl(data.id)"
          target="_blank"
        >
          <mat-icon>download</mat-icon>
          Baixar Documento PDF
        </a>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .submission-dialog {
        padding: 8px;
        min-width: 520px;
      }

      .dialog-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
      }

      .icon-circle {
        width: 44px;
        height: 44px;
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

      .sub-id {
        font-size: 0.775rem;
        font-family: 'Roboto Mono', monospace;
        color: #64748b;
      }

      .meta-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 20px;
      }

      .meta-card {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 10px 12px;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }

      .meta-label {
        font-size: 0.75rem;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
      }

      .meta-value {
        font-size: 0.9rem;
        font-weight: 500;
        color: #0f172a;
      }

      .payload-section {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .section-title {
        font-size: 0.8rem;
        font-weight: 700;
        color: #475569;
        text-transform: uppercase;
      }

      .json-viewer {
        background: #0f172a;
        color: #38bdf8;
        padding: 14px;
        border-radius: 8px;
        font-family: 'Roboto Mono', monospace;
        font-size: 0.85rem;
        max-height: 240px;
        overflow-y: auto;
        line-height: 1.4;
      }
    `,
  ],
})
export class SubmissionDetailsDialogComponent {
  readonly dialogRef = inject(MatDialogRef<SubmissionDetailsDialogComponent>);
  readonly data: Submission = inject(MAT_DIALOG_DATA);
  readonly submissionApi = inject(SubmissionApiService);

  getFormattedData(): string {
    if (typeof this.data.data === 'string') {
      try {
        return JSON.stringify(JSON.parse(this.data.data), null, 2);
      } catch {
        return this.data.data;
      }
    }
    return JSON.stringify(this.data.data, null, 2);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
