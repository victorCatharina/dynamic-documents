import { api } from '../services/api';

export function renderSidebar(activeRoute: string): string {
  const user = api.getUser() || { name: 'Administrador', email: 'admin@dynamicdocs.com', role: 'ADMIN' };
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'A';

  const navItems = [
    { id: 'documents', label: 'Documentos', icon: '📄', href: '#/documents' },
    { id: 'custom-fields', label: 'Campos Customizados', icon: '🏷️', href: '#/custom-fields' },
    { id: 'submissions', label: 'Submissões & Histórico', icon: '📊', href: '#/submissions' },
    { id: 'api-keys', label: 'API Keys & Integração', icon: '🔑', href: '#/api-keys' },
    { id: 'playground', label: 'API Playground', icon: '⚡', href: '#/playground' },
  ];

  return `
    <aside class="sidebar">
      <div class="sidebar-header">
        <div class="brand-icon">D</div>
        <div>
          <div class="brand-title">Dynamic Docs</div>
          <div class="brand-badge">Document Engine</div>
        </div>
      </div>

      <nav class="sidebar-nav">
        ${navItems
          .map(
            (item) => `
          <a href="${item.href}" class="nav-item ${activeRoute === item.id ? 'active' : ''}">
            <span style="font-size: 1.15rem;">${item.icon}</span>
            <span>${item.label}</span>
          </a>
        `,
          )
          .join('')}
      </nav>

      <div class="sidebar-footer">
        <div class="user-badge">
          <div class="user-avatar">${userInitial}</div>
          <div class="user-info">
            <div class="user-name">${user.name || 'Admin'}</div>
            <div class="user-role">${user.email || 'admin@dynamicdocs.com'}</div>
          </div>
        </div>
        <button id="logout-btn" class="btn-icon" title="Sair do sistema" style="cursor: pointer;">
          🚪
        </button>
      </div>
    </aside>
  `;
}
