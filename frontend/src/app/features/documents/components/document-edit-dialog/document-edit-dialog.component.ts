import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Document } from '../../../../core/models/document.model';

@Component({
  selector: 'app-document-edit-dialog',
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
          <mat-icon>edit_note</mat-icon>
        </div>
        <h2 mat-dialog-title>Editar Metadados</h2>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-dialog-content>
          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Nome do Documento</mat-label>
            <input matInput formControlName="name" />
            @if (form.get('name')?.hasError('required') && form.get('name')?.touched) {
              <mat-error>O nome é obrigatório</mat-error>
            }
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-full">
            <mat-label>Descrição</mat-label>
            <textarea matInput formControlName="description" rows="3"></textarea>
          </mat-form-field>
        </mat-dialog-content>

        <mat-dialog-actions align="end">
          <button mat-button type="button" (click)="onCancel()">Cancelar</button>
          <button mat-flat-button color="primary" type="submit" [disabled]="form.invalid">
            Salvar Alterações
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
        margin-bottom: 12px;
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
      .w-full {
        width: 100%;
        margin-bottom: 8px;
      }
    `,
  ],
})
export class DocumentEditDialogComponent {
  private readonly fb = inject(FormBuilder);
  readonly dialogRef = inject(MatDialogRef<DocumentEditDialogComponent>);
  readonly data: Document = inject(MAT_DIALOG_DATA);

  readonly form: FormGroup = this.fb.group({
    name: [this.data.name, [Validators.required, Validators.minLength(2)]],
    description: [this.data.description || ''],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.dialogRef.close(this.form.value);
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
