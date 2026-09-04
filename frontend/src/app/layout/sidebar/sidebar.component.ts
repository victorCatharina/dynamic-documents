import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

interface NavItem {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatRippleModule],
  template: `
    <nav class="app-sidebar">
      <div class="nav-section">
        <span class="nav-label">Gerenciamento</span>
        <ul class="nav-list">
          @for (item of navItems; track item.path) {
            <li>
              <a
                [routerLink]="item.path"
                routerLinkActive="active"
                matRipple
                class="nav-item"
              >
                <mat-icon>{{ item.icon }}</mat-icon>
                <span>{{ item.label }}</span>
              </a>
            </li>
          }
        </ul>
      </div>

      <div class="sidebar-footer">
        <div class="system-status">
          <span class="status-dot"></span>
          <span>Backend conectado</span>
        </div>
      </div>
    </nav>
  `,
  styles: [
    `
      .app-sidebar {
        width: 240px;
        background: #ffffff;
        border-right: 1px solid #e2e8f0;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 20px 12px;
        height: calc(100vh - 64px);
        position: sticky;
        top: 64px;
      }

      .nav-section {
        display: flex;
        flex-direction: column;
      }

      .nav-label {
        font-size: 0.725rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.08em;
        color: #94a3b8;
        padding: 0 12px;
        margin-bottom: 8px;
      }

      .nav-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .nav-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 8px;
        color: #475569;
        text-decoration: none;
        font-size: 0.9rem;
        font-weight: 500;
        transition: all 0.15s ease;

        mat-icon {
          font-size: 20px;
          width: 20px;
          height: 20px;
          color: #64748b;
        }

        &:hover {
          background: #f1f5f9;
          color: #0f172a;

          mat-icon {
            color: #2563eb;
          }
        }

        &.active {
          background: #eff6ff;
          color: #2563eb;
          font-weight: 600;

          mat-icon {
            color: #2563eb;
          }
        }
      }

      .sidebar-footer {
        padding: 12px;
        border-top: 1px solid #f1f5f9;
      }

      .system-status {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.775rem;
        color: #64748b;
      }

      .status-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #10b981;
        box-shadow: 0 0 0 2px #d1fae5;
      }
    `,
  ],
})
export class SidebarComponent {
  readonly navItems: NavItem[] = [
    { path: '/documents', label: 'Documentos', icon: 'description' },
    { path: '/custom-fields', label: 'Campos Customizados', icon: 'tune' },
    { path: '/submissions', label: 'Submissões', icon: 'assignment_turned_in' },
    { path: '/api-keys', label: 'Chaves de API', icon: 'vpn_key' },
  ];
}
