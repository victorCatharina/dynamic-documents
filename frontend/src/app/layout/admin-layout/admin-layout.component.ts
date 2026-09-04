import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, SidebarComponent],
  template: `
    <div class="admin-layout">
      <app-header></app-header>
      <div class="layout-body">
        <app-sidebar></app-sidebar>
        <main class="layout-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .admin-layout {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: #f8fafc;
      }

      .layout-body {
        display: flex;
        flex: 1;
      }

      .layout-content {
        flex: 1;
        padding: 32px;
        overflow-y: auto;
        max-width: 1400px;
        width: 100%;
        margin: 0 auto;
      }

      @media (max-width: 768px) {
        .layout-body {
          flex-direction: column;
        }
        .layout-content {
          padding: 16px;
        }
      }
    `,
  ],
})
export class AdminLayoutComponent {}
