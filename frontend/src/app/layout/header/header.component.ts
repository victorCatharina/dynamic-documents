import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
  ],
  template: `
    <header class="app-header">
      <div class="header-left">
        <div class="brand">
          <div class="brand-icon">
            <mat-icon>auto_stories</mat-icon>
          </div>
          <span class="brand-title">Documentos Dinâmicos</span>
        </div>
      </div>

      <div class="header-right">
        @if (currentUser()) {
          <button mat-button [matMenuTriggerFor]="userMenu" class="user-btn">
            <div class="user-avatar">
              {{ getUserInitial() }}
            </div>
            <span class="user-name">{{ currentUser()?.name || currentUser()?.email }}</span>
            <mat-icon>expand_more</mat-icon>
          </button>

          <mat-menu #userMenu="matMenu" xPosition="before" class="user-menu-panel">
            <div class="user-menu-header">
              <span class="menu-name">{{ currentUser()?.name }}</span>
              <span class="menu-email">{{ currentUser()?.email }}</span>
              <span class="badge badge-manual">{{ currentUser()?.role }}</span>
            </div>
            <mat-divider></mat-divider>
            <button mat-menu-item (click)="logout()">
              <mat-icon color="warn">logout</mat-icon>
              <span>Sair do sistema</span>
            </button>
          </mat-menu>
        }
      </div>
    </header>
  `,
  styles: [
    `
      .app-header {
        height: 64px;
        background: #ffffff;
        border-bottom: 1px solid #e2e8f0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        position: sticky;
        top: 0;
        z-index: 100;
      }

      .header-left {
        display: flex;
        align-items: center;
        gap: 16px;
      }

      .brand {
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .brand-icon {
        width: 38px;
        height: 38px;
        border-radius: 8px;
        background: linear-gradient(135deg, #2563eb, #1d4ed8);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 4px rgba(37, 99, 235, 0.2);

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
        }
      }

      .brand-title {
        font-family: 'Outfit', sans-serif;
        font-size: 1.15rem;
        font-weight: 700;
        color: #0f172a;
        letter-spacing: -0.02em;
      }

      .user-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 4px 12px;
        border-radius: 9999px;
        background: #f8fafc;
        border: 1px solid #e2e8f0;
        height: 44px;

        &:hover {
          background: #f1f5f9;
        }
      }

      .user-avatar {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #2563eb;
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 600;
        font-size: 0.85rem;
      }

      .user-name {
        font-size: 0.9rem;
        font-weight: 500;
        color: #334155;
      }

      .user-menu-header {
        padding: 12px 16px;
        display: flex;
        flex-direction: column;
        gap: 4px;

        .menu-name {
          font-weight: 600;
          color: #0f172a;
          font-size: 0.95rem;
        }

        .menu-email {
          color: #64748b;
          font-size: 0.825rem;
          margin-bottom: 4px;
        }
      }
    `,
  ],
})
export class HeaderComponent {
  private readonly authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser;

  getUserInitial(): string {
    const name = this.currentUser()?.name || this.currentUser()?.email || 'A';
    return name.charAt(0).toUpperCase();
  }

  logout(): void {
    this.authService.logout();
  }
}
