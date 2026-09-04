import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  template: `
    <div class="public-layout">
      <header class="public-header">
        <div class="brand">
          <div class="brand-icon">
            <mat-icon>auto_stories</mat-icon>
          </div>
          <span class="brand-title">Portal de Documentos</span>
        </div>
      </header>

      <main class="public-content">
        <router-outlet></router-outlet>
      </main>

      <footer class="public-footer">
        <p>Plataforma de Documentos Dinâmicos &copy; 2026</p>
      </footer>
    </div>
  `,
  styles: [
    `
      .public-layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #f1f5f9;
      }

      .public-header {
        height: 64px;
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 24px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .brand-icon {
        width: 32px;
        height: 32px;
        border-radius: 6px;
        background: #2563eb;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;

        mat-icon {
          font-size: 18px;
          width: 18px;
          height: 18px;
        }
      }

      .brand-title {
        font-family: 'Outfit', sans-serif;
        font-size: 1.1rem;
        font-weight: 700;
        color: #0f172a;
      }

      .public-content {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 32px 16px;
      }

      .public-footer {
        padding: 16px;
        text-align: center;
        font-size: 0.8rem;
        color: #94a3b8;
      }
    `,
  ],
})
export class PublicLayoutComponent {}
