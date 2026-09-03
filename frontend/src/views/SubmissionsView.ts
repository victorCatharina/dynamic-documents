import { api } from '../services/api';
import { toast } from '../services/toast';
import { modal } from '../services/modal';
import { renderSidebar } from '../components/Sidebar';

export async function renderSubmissionsView(container: HTMLElement) {
  container.innerHTML = `
    <div class="app-layout">
      ${renderSidebar('submissions')}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">Submissões & Histórico</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Histórico completo de documentos preenchidos e gerados</p>
          </div>
          <button id="refresh-submissions-btn" class="btn btn-secondary">
            🔄 Atualizar
          </button>
        </header>

        <div class="page-container">
          <div id="submissions-list-container">
            <div style="text-align: center; padding: 60px; color: var(--text-muted);">
              Carregando histórico...
            </div>
          </div>
        </div>
      </main>
    </div>
  `;

  // Attach logout handler
  container.querySelector('#logout-btn')?.addEventListener('click', () => {
    api.removeToken();
    window.location.hash = '#/login';
    toast.info('Sessão encerrada.');
  });

  const listContainer = container.querySelector('#submissions-list-container') as HTMLElement;

  const loadSubmissions = async () => {
    try {
      const response = await api.getSubmissions();
      const subs = response.data || [];

      if (subs.length === 0) {
        listContainer.innerHTML = `
          <div class="card" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">📊</div>
            <h3 style="margin-bottom: 8px;">Nenhuma submissão registrada</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px;">
              Preencha um documento através do formulário público ou envie dados via API para visualizar as submissões aqui.
            </p>
            <a href="#/documents" class="btn btn-primary">
              📄 Ir para Documentos
            </a>
          </div>
        `;
        return;
      }

      listContainer.innerHTML = `
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>ID da Submissão</th>
                <th>Documento</th>
                <th>Versão Utilizada</th>
                <th>Status</th>
                <th>Data de Geração</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${subs
                .map((sub: any) => {
                  const statusClass =
                    sub.status === 'GENERATED'
                      ? 'badge-published'
                      : sub.status === 'FAILED'
                        ? 'badge-archived'
                        : 'badge-draft';

                  return `
                  <tr>
                    <td>
                      <code style="font-family: var(--font-mono); font-size: 0.8rem; color: #a5b4fc;">
                        ${sub.id}
                      </code>
                    </td>
                    <td style="font-weight: 600; color: #fff;">
                      ${sub.document?.name || 'Documento'}
                    </td>
                    <td>
                      <span style="font-weight: 600; color: var(--accent);">
                        v${sub.documentVersion?.versionNumber || 1}
                      </span>
                    </td>
                    <td>
                      <span class="badge ${statusClass}">${sub.status}</span>
                    </td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">
                      ${new Date(sub.createdAt).toLocaleString('pt-BR')}
                    </td>
                    <td style="text-align: right;">
                      <div style="display: inline-flex; gap: 8px;">
                        <button class="btn btn-secondary view-data-btn" data-sub-id="${sub.id}" style="padding: 6px 12px; font-size: 0.82rem;">
                          🔍 Ver Dados
                        </button>
                        <a href="/api/v1/submissions/${sub.id}/document" target="_blank" class="btn btn-primary" style="padding: 6px 12px; font-size: 0.82rem;">
                          📄 Baixar PDF
                        </a>
                      </div>
                    </td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      `;

      // View raw submission data
      listContainer.querySelectorAll('.view-data-btn').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const subId = (e.currentTarget as HTMLElement).dataset.subId!;
          try {
            const sub = await api.getSubmission(subId);
            modal.open({
              title: `Dados da Submissão (${sub.id.slice(0, 8)})`,
              bodyHtml: `
                <div style="margin-bottom: 12px; font-size: 0.85rem; color: var(--text-secondary);">
                  <strong>Documento:</strong> ${sub.document?.name} (Versão v${sub.documentVersion?.versionNumber})<br />
                  <strong>Criado em:</strong> ${new Date(sub.createdAt).toLocaleString('pt-BR')}
                </div>
                <pre style="background: var(--bg-dark); padding: 14px; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: #a5b4fc; max-height: 360px; overflow: auto;">${JSON.stringify(sub.data, null, 2)}</pre>
              `,
              cancelText: 'Fechar',
              confirmText: 'Baixar PDF',
              onConfirm: () => {
                window.open(`/api/v1/submissions/${sub.id}/document`, '_blank');
              },
            });
          } catch (err: any) {
            toast.error(`Erro ao carregar dados: ${err.message}`);
          }
        });
      });
    } catch (err: any) {
      listContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px; color: var(--danger);">
          <p>Erro ao carregar submissões: ${err.message}</p>
        </div>
      `;
    }
  };

  container.querySelector('#refresh-submissions-btn')?.addEventListener('click', loadSubmissions);
  loadSubmissions();
}
