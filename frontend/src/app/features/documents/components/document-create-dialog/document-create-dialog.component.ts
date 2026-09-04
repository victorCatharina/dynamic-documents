import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-document-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="dialog-container">
      <div class="dialog-header">
        <div class="icon-circle">
          <mat-icon>add_chart</mat-icon>
        </div>
        <h2 mat-dialog-title>Novo Documento</h2>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-dialog-content>
          <p class="dialog-description">
            Crie um novo documento lógico. A versão inicial (v1 rascunho) será gerada automaticamente e aberta no editor.
          </p>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Nome do Documento</mat-label>
            <input
              matInput
              formControlName="name"
              placeholder="Ex: Contrato de Prestação de Serviços"
              autofocus
            />
            @if (form.get('name')?.hasError('required') && form.get('name')?.touched) {
              <mat-error>O nome do documento é obrigatório</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Descrição (Opcional)</mat-label>
            <textarea
              matInput
              formControlName="description"
              rows="3"
              placeholder="Descreva o propósito ou contexto deste documento..."
            ></textarea>
          </mat-form-field>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button type="button" (click)="onCancel()">Cancelar</button>
          <button
            mat-flat-button
            color="primary"
            type="submit"
            [disabled]="form.invalid"
          >
            <mat-icon>palette</mat-icon>
            Criar e Abrir no Builder
          </button>
        </mat-dialog-actions>
      </form>
    </div>
  `,
  styles: [
    `
      .dialog-container {
        padding: 8px;
        min-width: 420px;
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
      .dialog-description {
        color: #64748b;
        font-size: 0.9rem;
        margin-bottom: 16px;
      }
      .w-full {
        width: 100%;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class DocumentCreateDialogComponent {
  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<DocumentCreateDialogComponent>);

  readonly form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: [''],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
