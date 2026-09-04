import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  template: `
    <div class="spinner-container" [class.overlay]="overlay()">
      <mat-spinner [diameter]="diameter()" color="primary"></mat-spinner>
      @if (message()) {
        <p class="spinner-message">{{ message() }}</p>
      }
    </div>
  `,
  styles: [
    `
      .spinner-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
        gap: 12px;

        &.overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(2px);
          z-index: 50;
          border-radius: inherit;
        }
      }

      .spinner-message {
        font-size: 0.9rem;
        font-weight: 500;
        color: #475569;
        margin: 0;
      }
    `,
  ],
})
export class LoadingSpinnerComponent {
  readonly diameter = input<number>(40);
  readonly message = input<string>('');
  readonly overlay = input<boolean>(false);
}
