import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { CustomFieldDefinition } from '../../../../core/models/custom-field.model';

@Component({
  selector: 'app-custom-field-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
  ],
  template: `
    <div class="custom-field-dialog">
      <div class="dialog-header">
        <div class="icon-circle">
          <mat-icon>{{ isEditMode ? 'edit' : 'tune' }}</mat-icon>
        </div>
        <h2 mat-dialog-title>{{ isEditMode ? 'Editar Campo Personalizado' : 'Novo Campo Personalizado' }}</h2>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-dialog-content>
          <div class="form-grid">
            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Chave Identificadora (Key)</mat-label>
              <input
                matInput
                formControlName="key"
                placeholder="Ex: nomePaciente, numeroContrato"
                [readonly]="isEditMode"
                class="font-mono"
              />
              <mat-hint>Nome da propriedade no JSON (somente letras, números e _)</mat-hint>
              @if (form.get('key')?.hasError('required') && form.get('key')?.touched) {
                <mat-error>A chave é obrigatória</mat-error>
              }
              @if (form.get('key')?.hasError('pattern') && form.get('key')?.touched) {
                <mat-error>Formato inválido (use apenas letras, números e _)</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Rótulo Amigável (Label)</mat-label>
              <input
                matInput
                formControlName="label"
                placeholder="Ex: Nome do Paciente"
              />
              @if (form.get('label')?.hasError('required') && form.get('label')?.touched) {
                <mat-error>O rótulo é obrigatório</mat-error>
              }
            </mat-form-field>

            <mat-form-field appearance="outline" class="w-full">
              <mat-label>Tipo do Dado</mat-label>
              <mat-select formControlName="type">
                <mat-option value="TEXT">Texto (String)</mat-option>
                <mat-option value="NUMBER">Número</mat-option>
                <mat-option value="DATE">Data</mat-option>
                <mat-option value="IMAGE">Imagem (URL)</mat-option>
                <mat-option value="FILE">Arquivo (URL)</mat-option>
              </mat-select>
            </mat-form-field>

            <div class="mode-container">
              <label class="section-label">Modo de Entrada Padrão</label>
              <mat-button-toggle-group formControlName="inputMode" class="w-full mode-toggle">
                <mat-button-toggle value="INTEGRATION">
                  <mat-icon>api</mat-icon>
                  Integração (API)
                </mat-button-toggle>
                <mat-button-toggle value="MANUAL">
                  <mat-icon>edit_document</mat-icon>
                  Manual (Formulário)
                </mat-button-toggle>
              </mat-button-toggle-group>
            </div>
          </div>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button type="button" (click)="onCancel()">Cancelar</button>
          <button
            mat-flat-button
            color="primary"
            type="submit"
            [disabled]="form.invalid"
          >
            {{ isEditMode ? 'Salvar Alterações' : 'Cadastrar Campo' }}
          </button>
        </mat-dialog-actions>
      </form>
    </div>
  `,
  styles: [
    `
      .custom-field-dialog {
        padding: 8px;
        min-width: 440px;
      }

      .dialog-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 12px;
      }

      .icon-circle {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        background: #f5f3ff;
        color: #7c3aed;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }

      .form-grid {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px 0;
      }

      .w-full {
        width: 100%;
      }

      .section-label {
        font-size: 0.775rem;
        font-weight: 600;
        color: #64748b;
        margin-bottom: 6px;
        display: block;
      }

      .mode-toggle {
        display: flex;
        mat-button-toggle {
          flex: 1;
        }
      }
    `,
  ],
})
export class CustomFieldDialogComponent {
  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<CustomFieldDialogComponent>);
  readonly data: CustomFieldDefinition | null = inject(MAT_DIALOG_DATA, { optional: true });

  readonly isEditMode = !!this.data;

  readonly form: FormGroup = this.fb.group({
    key: [
      this.data?.key || '',
      [Validators.required, Validators.pattern(/^[a-zA-Z][a-zA-Z0-9_.]*$/)],
    ],
    label: [this.data?.label || '', [Validators.required]],
    type: [this.data?.type || 'TEXT', [Validators.required]],
    inputMode: [this.data?.inputMode || 'INTEGRATION', [Validators.required]],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
