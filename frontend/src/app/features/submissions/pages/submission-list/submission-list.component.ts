import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { SubmissionApiService } from '../../../../core/api/submission-api.service';
import { Submission } from '../../../../core/models/submission.model';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { SubmissionDetailsDialogComponent } from '../../components/submission-details-dialog/submission-details-dialog.component';

@Component({
  selector: 'app-submission-list',
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
    EmptyStateComponent,
  ],
  template: `
    <div class="page-container">
      <div class="page-header">
        <div>
          <h1 class="page-title">Submissões e Preenchimentos</h1>
          <p class="page-subtitle">
            Histórico completo de formulários preenchidos e PDFs gerados no portal.
          </p>
        </div>
      </div>

      @if (isLoading()) {
        <app-loading-spinner message="Carregando histórico de submissões..."></app-loading-spinner>
      } @else if (submissions().length === 0) {
        <div class="empty-container app-card">
          <app-empty-state
            icon="assignment_turned_in"
            title="Nenhuma submissão registrada"
            description="Quando os formulários públicos ou integrações enviarem dados, os registros e PDFs aparecerão aqui."
          ></app-empty-state>
        </div>
      } @else {
        <div class="submissions-table-card app-card">
          <table mat-table [dataSource]="submissions()" class="w-full">
            <!-- ID Column -->
            <ng-container matColumnDef="id">
              <th mat-header-cell *matHeaderCellDef>ID da Submissão</th>
              <td mat-cell *matCellDef="let sub">
                <code class="sub-id-code">{{ sub.id.substring(0, 8) }}...</code>
              </td>
            </ng-container>

            <!-- Documento Column -->
            <ng-container matColumnDef="document">
              <th mat-header-cell *matHeaderCellDef>Documento</th>
              <td mat-cell *matCellDef="let sub">
                <span class="doc-title">{{ sub.document?.name || 'Documento' }}</span>
              </td>
            </ng-container>

            <!-- Versão Column -->
            <ng-container matColumnDef="version">
              <th mat-header-cell *matHeaderCellDef>Versão</th>
              <td mat-cell *matCellDef="let sub">
                <span class="version-tag">v{{ sub.documentVersion?.versionNumber || 1 }}</span>
              </td>
            </ng-container>

            <!-- Status Column -->
            <ng-container matColumnDef="status">
              <th mat-header-cell *matHeaderCellDef>Status</th>
              <td mat-cell *matCellDef="let sub">
                <span class="badge badge-published">{{ sub.status }}</span>
              </td>
            </ng-container>

            <!-- Data Column -->
            <ng-container matColumnDef="createdAt">
              <th mat-header-cell *matHeaderCellDef>Data</th>
              <td mat-cell *matCellDef="let sub">
                {{ sub.createdAt | date: 'dd/MM/yyyy HH:mm' }}
              </td>
            </ng-container>

            <!-- Ações Column -->
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef class="text-right">Ações</th>
              <td mat-cell *matCellDef="let sub" class="text-right">
                <div class="actions-cell">
                  <button
                    mat-stroked-button
                    (click)="openDetails(sub)"
                    matTooltip="Ver dados preenchidos"
                  >
                    <mat-icon>data_object</mat-icon>
                    Dados
                  </button>

                  <a
                    mat-flat-button
                    color="primary"
                    [href]="submissionApi.getSubmissionDocumentUrl(sub.id)"
                    target="_blank"
                    matTooltip="Baixar PDF gerado"
                  >
                    <mat-icon>download</mat-icon>
                    Baixar PDF
                  </a>
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

      .submissions-table-card {
        padding: 0;
        overflow: hidden;
      }

      .w-full {
        width: 100%;
      }

      .sub-id-code {
        font-family: 'Roboto Mono', monospace;
        font-size: 0.8rem;
        background: #f1f5f9;
        padding: 2px 6px;
        border-radius: 4px;
        color: #475569;
      }

      .doc-title {
        font-weight: 600;
        color: #0f172a;
      }

      .version-tag {
        font-size: 0.75rem;
        font-weight: 700;
        background: #eff6ff;
        color: #2563eb;
        padding: 2px 6px;
        border-radius: 4px;
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
export class SubmissionListComponent implements OnInit {
  readonly submissionApi = inject(SubmissionApiService);
  private readonly route = inject(ActivatedRoute);
  private readonly dialog = inject(MatDialog);

  readonly submissions = signal<Submission[]>([]);
  readonly isLoading = signal<boolean>(true);

  readonly displayedColumns: string[] = ['id', 'document', 'version', 'status', 'createdAt', 'actions'];

  ngOnInit(): void {
    const docId = this.route.snapshot.queryParamMap.get('documentId') || undefined;
    this.loadSubmissions(docId);
  }

  loadSubmissions(documentId?: string): void {
    this.isLoading.set(true);
    this.submissionApi.getSubmissions({ documentId }).subscribe({
      next: (res) => {
        this.submissions.set(res.data);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      },
    });
  }

  openDetails(sub: Submission): void {
    this.dialog.open(SubmissionDetailsDialogComponent, {
      data: sub,
    });
  }
}
