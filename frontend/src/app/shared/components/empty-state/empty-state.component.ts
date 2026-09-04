import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="empty-state-container">
      <div class="icon-circle">
        <mat-icon>{{ icon() }}</mat-icon>
      </div>
      <h3>{{ title() }}</h3>
      @if (description()) {
        <p>{{ description() }}</p>
      }
      @if (actionLabel()) {
        <button mat-flat-button color="primary" (click)="actionClicked.emit()">
          <mat-icon>{{ actionIcon() }}</mat-icon>
          {{ actionLabel() }}
        </button>
      }
    </div>
  `,
  styles: [
    `
      .empty-state-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 48px 24px;
        text-align: center;
      }

      .icon-circle {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background-color: #f1f5f9;
        color: #64748b;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 16px;

        mat-icon {
          font-size: 32px;
          width: 32px;
          height: 32px;
        }
      }

      h3 {
        font-size: 1.15rem;
        font-weight: 600;
        color: #1e293b;
        margin-bottom: 8px;
      }

      p {
        font-size: 0.925rem;
        color: #64748b;
        max-width: 400px;
        margin-bottom: 24px;
        line-height: 1.5;
      }
    `,
  ],
})
export class EmptyStateComponent {
  readonly icon = input<string>('inbox');
  readonly title = input<string>('Nenhum item encontrado');
  readonly description = input<string>('');
  readonly actionLabel = input<string>('');
  readonly actionIcon = input<string>('add');

  readonly actionClicked = output<void>();
}
