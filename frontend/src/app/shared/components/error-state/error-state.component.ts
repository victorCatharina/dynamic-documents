import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  template: `
    <div class="error-state-container">
      <div class="icon-circle">
        <mat-icon>error_outline</mat-icon>
      </div>
      <h3>{{ title() }}</h3>
      <p>{{ message() }}</p>
      @if (showRetry()) {
        <button mat-stroked-button color="warn" (click)="retryClicked.emit()">
          <mat-icon>refresh</mat-icon>
          Tentar novamente
        </button>
      }
    </div>
  `,
  styles: [
    `
      .error-state-container {
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
        background-color: #fef2f2;
        color: #ef4444;
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
        max-width: 420px;
        margin-bottom: 20px;
        line-height: 1.5;
      }
    `,
  ],
})
export class ErrorStateComponent {
  readonly title = input<string>('Erro ao carregar informações');
  readonly message = input<string>('Ocorreu uma falha ao se comunicar com o servidor.');
  readonly showRetry = input<boolean>(true);

  readonly retryClicked = output<void>();
}
