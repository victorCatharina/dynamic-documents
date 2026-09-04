import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
  icon?: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="confirm-dialog-content">
      <div class="header">
        <div class="icon-wrapper" [class.destructive]="data.isDestructive">
          <mat-icon>{{ data.icon || (data.isDestructive ? 'warning' : 'help_outline') }}</mat-icon>
        </div>
        <h2 mat-dialog-title>{{ data.title }}</h2>
      </div>

      <mat-dialog-content>
        <p>{{ data.message }}</p>
      </mat-dialog-content>

      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">
          {{ data.cancelText || 'Cancelar' }}
        </button>
        <button
          mat-flat-button
          [color]="data.isDestructive ? 'warn' : 'primary'"
          (click)="onConfirm()"
        >
          {{ data.confirmText || 'Confirmar' }}
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [
    `
      .confirm-dialog-content {
        padding: 8px;
      }
      .header {
        display: flex;
        align-items: center;
        gap: 16px;
        margin-bottom: 8px;
      }
      .icon-wrapper {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: #eff6ff;
        color: #2563eb;
        display: flex;
        align-items: center;
        justify-content: center;

        &.destructive {
          background-color: #fef2f2;
          color: #dc2626;
        }
      }
      h2 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
      }
      p {
        color: #475569;
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
      }
    `,
  ],
})
export class ConfirmDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);
  readonly data: ConfirmDialogData = inject(MAT_DIALOG_DATA);

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
