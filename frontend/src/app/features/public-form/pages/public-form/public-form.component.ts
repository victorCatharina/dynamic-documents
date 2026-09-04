import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PublicFormApiService } from '../../../../core/api/public-form-api.service';
import { SubmissionApiService } from '../../../../core/api/submission-api.service';
import {
  PublicFormSchemaResponse,
  SubmissionCreatedResponse,
} from '../../../../core/models/submission.model';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner.component';
import { ErrorStateComponent } from '../../../../shared/components/error-state/error-state.component';
import { MaskDirective } from '../../../../shared/directives/mask.directive';

@Component({
  selector: 'app-public-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    LoadingSpinnerComponent,
    ErrorStateComponent,
    MaskDirective,
  ],
  template: `
    <div class="public-form-wrapper">
      @if (isLoading()) {
        <app-loading-spinner message="Carregando formulário..."></app-loading-spinner>
      } @else if (errorMessage(); as msg) {
        <div class="card-container">
          <app-error-state
            title="Formulário Indisponível"
            [message]="msg"
            [showRetry]="false"
          ></app-error-state>
        </div>
      } @else if (submittedResult(); as res) {
        <!-- Success State -->
        <div class="card-container">
          <mat-card class="success-card app-card">
            <div class="success-icon-circle">
              <mat-icon>check_circle</mat-icon>
            </div>
            <h2>Documento Gerado com Sucesso!</h2>
            <p class="success-desc">
              Seus dados foram processados e o documento em PDF foi gerado pelo sistema.
            </p>

            <div class="submission-meta-box">
              <span class="meta-label">Protocolo da Submissão</span>
              <code class="meta-val">{{ res.submissionId }}</code>
            </div>

            <div class="download-action">
              <a
                mat-flat-button
                color="primary"
                [href]="submissionApi.getSubmissionDocumentUrl(res.submissionId)"
                target="_blank"
                class="download-btn"
              >
                <mat-icon>download</mat-icon>
                Baixar Documento PDF
              </a>
            </div>
          </mat-card>
        </div>
      } @else if (schema(); as s) {
        <!-- Dynamic Form -->
        <div class="card-container">
          <mat-card class="form-card app-card">
            <div class="form-header">
              <div class="header-badge">
                <mat-icon>edit_document</mat-icon>
              </div>
              <h1 class="doc-title">{{ s.documentName }}</h1>
              @if (s.description) {
                <p class="doc-desc">{{ s.description }}</p>
              }
            </div>

            <form [formGroup]="form" (ngSubmit)="onSubmit()">
              <div class="fields-list">
                @for (field of s.fields; track field.id) {
                  <mat-form-field appearance="outline" class="w-full">
                    <mat-label>{{ field.label || field.key }}</mat-label>

                    @switch (field.type) {
                      @case ('NUMBER') {
                        <input
                          matInput
                          type="number"
                          [formControlName]="field.key"
                          [placeholder]="'Insira ' + (field.label || field.key).toLowerCase()"
                        />
                      }
                      @case ('DATE') {
                        <input
                          matInput
                          type="date"
                          [formControlName]="field.key"
                        />
                      }
                      @case ('IMAGE') {
                        <input
                          matInput
                          type="url"
                          [formControlName]="field.key"
                          placeholder="https://exemplo.com/imagem.png"
                        />
                      }
                      @case ('FILE') {
                        <input
                          matInput
                          type="url"
                          [formControlName]="field.key"
                          placeholder="https://exemplo.com/arquivo.pdf"
                        />
                      }
                      @default {
                        <input
                          matInput
                          type="text"
                          [formControlName]="field.key"
                          [appMask]="field.mask || ''"
                          [placeholder]="'Insira ' + (field.label || field.key).toLowerCase()"
                        />
                      }
                    }

                    @if (field.required) {
                      <mat-hint>Obrigatório</mat-hint>
                    }

                    @if (form.get(field.key)?.hasError('required') && form.get(field.key)?.touched) {
                      <mat-error>Este campo é obrigatório</mat-error>
                    }
                    @if (form.get(field.key)?.hasError('minlength') && form.get(field.key)?.touched) {
                      <mat-error>Mínimo de caracteres não atingido</mat-error>
                    }
                  </mat-form-field>
                }
              </div>

              <div class="form-actions">
                <button
                  mat-flat-button
                  color="primary"
                  type="submit"
                  class="submit-btn"
                  [disabled]="form.invalid || isSubmitting()"
                >
                  @if (isSubmitting()) {
                    <mat-spinner diameter="20" class="spinner"></mat-spinner>
                    <span>Gerando Documento PDF...</span>
                  } @else {
                    <ng-container>
                      <mat-icon>send</mat-icon>
                      <span>Enviar e Gerar PDF</span>
                    </ng-container>
                  }
                </button>
              </div>
            </form>
          </mat-card>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .public-form-wrapper {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      .card-container {
        width: 100%;
        max-width: 600px;
      }

      .form-card, .success-card {
        padding: 32px 28px;
        border-radius: 16px;
        background: #ffffff;
      }

      .form-header {
        text-align: center;
        margin-bottom: 28px;
        display: flex;
        flex-direction: column;
        align-items: center;

        .header-badge {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #eff6ff;
          color: #2563eb;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 12px;

          mat-icon {
            font-size: 24px;
            width: 24px;
            height: 24px;
          }
        }

        .doc-title {
          font-size: 1.45rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0;
        }

        .doc-desc {
          color: #64748b;
          font-size: 0.925rem;
          margin: 6px 0 0 0;
          line-height: 1.4;
        }
      }

      .fields-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 24px;
      }

      .w-full {
        width: 100%;
      }

      .form-actions {
        display: flex;
        justify-content: center;
      }

      .submit-btn {
        width: 100%;
        height: 50px;
        font-size: 1rem;
        font-weight: 600;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
      }

      .success-card {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .success-icon-circle {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #ecfdf5;
        color: #10b981;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;

        mat-icon {
          font-size: 40px;
          width: 40px;
          height: 40px;
        }
      }

      .success-desc {
        color: #64748b;
        font-size: 0.95rem;
        margin-bottom: 20px;
        max-width: 440px;
      }

      .submission-meta-box {
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 10px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-bottom: 24px;
        width: 100%;
        max-width: 360px;

        .meta-label {
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
          text-transform: uppercase;
        }

        .meta-val {
          font-family: 'Roboto Mono', monospace;
          font-size: 0.85rem;
          color: #0f172a;
        }
      }

      .download-btn {
        height: 48px;
        padding: 0 28px;
        font-size: 0.95rem;
        font-weight: 600;
        border-radius: 8px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .spinner {
        display: inline-block;
        margin-right: 8px;
      }
    `,
  ],
})
export class PublicFormComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly publicFormApi = inject(PublicFormApiService);
  readonly submissionApi = inject(SubmissionApiService);

  readonly schema = signal<PublicFormSchemaResponse | null>(null);
  readonly isLoading = signal<boolean>(true);
  readonly isSubmitting = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly submittedResult = signal<SubmissionCreatedResponse | null>(null);

  form: FormGroup = this.fb.group({});
  publicToken = '';

  ngOnInit(): void {
    this.publicToken = this.route.snapshot.paramMap.get('publicToken') || '';
    if (this.publicToken) {
      this.loadFormSchema(this.publicToken);
    } else {
      this.errorMessage.set('Token do formulário público não informado.');
      this.isLoading.set(false);
    }
  }

  loadFormSchema(token: string): void {
    this.isLoading.set(true);
    this.publicFormApi.getPublicForm(token).subscribe({
      next: (schema) => {
        this.schema.set(schema);
        this.buildForm(schema);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
        if (err.status === 404) {
          this.errorMessage.set('Formulário público não encontrado ou link inválido.');
        } else {
          this.errorMessage.set('Não foi possível carregar este formulário. Tente novamente mais tarde.');
        }
      },
    });
  }

  buildForm(schema: PublicFormSchemaResponse): void {
    const group: Record<string, FormControl> = {};

    for (const field of schema.fields) {
      const validators = [];

      if (field.required) {
        validators.push(Validators.required);
      }

      if (field.validation?.minLength) {
        validators.push(Validators.minLength(field.validation.minLength));
      }

      if (field.validation?.maxLength) {
        validators.push(Validators.maxLength(field.validation.maxLength));
      }

      if (field.validation?.min !== undefined) {
        validators.push(Validators.min(field.validation.min));
      }

      if (field.validation?.max !== undefined) {
        validators.push(Validators.max(field.validation.max));
      }

      if (field.validation?.regex) {
        try {
          validators.push(Validators.pattern(new RegExp(field.validation.regex)));
        } catch {
          // ignore invalid regex from config
        }
      }

      group[field.key] = new FormControl('', validators);
    }

    this.form = this.fb.group(group);
  }

  onSubmit(): void {
    if (this.form.invalid || this.isSubmitting()) return;

    this.isSubmitting.set(true);
    this.publicFormApi.submitPublicForm(this.publicToken, this.form.value).subscribe({
      next: (res) => {
        this.submittedResult.set(res);
        this.isSubmitting.set(false);
      },
      error: () => {
        this.isSubmitting.set(false);
      },
    });
  }
}
