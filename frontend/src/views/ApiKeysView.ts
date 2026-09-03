import { api } from '../services/api';
import { toast } from '../services/toast';
import { modal } from '../services/modal';
import { renderSidebar } from '../components/Sidebar';

export async function renderApiKeysView(container: HTMLElement) {
  container.innerHTML = `
    <div class="app-layout">
      ${renderSidebar('api-keys')}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">API Keys & Integrações</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Gerencie credenciais para integração com sistemas externos (ERP, CRM, Hospitalar)</p>
          </div>
          <button id="generate-key-btn" class="btn btn-primary">
            🔑 Gerar Nova API Key
          </button>
        </header>

        <div class="page-container">
          <div class="card" style="margin-bottom: 24px; padding: 20px; background: rgba(99, 102, 241, 0.08); border-color: rgba(99, 102, 241, 0.25);">
            <h3 style="font-size: 0.98rem; font-weight: 700; margin-bottom: 8px; color: var(--accent);">
              💡 Como utilizar sua API Key para envio de dados
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 12px;">
              Sistemas externos devem enviar a chave no cabeçalho HTTP <code>Authorization: Bearer &lt;API_KEY&gt;</code> para criar submissions ou validar payloads.
            </p>
            <pre style="background: var(--bg-dark); padding: 12px 16px; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.8rem; color: #a5b4fc; overflow-x: auto;">
curl -X POST http://localhost:3000/api/v1/documents/{documentId}/submissions \\
  -H "Authorization: Bearer dd_live_..." \\
  -H "Content-Type: application/json" \\
  -d '{"data": {"nomeCliente": "João Silva", "nomePaciente": "Maria Silva", "numeroContrato": "CTR-001"}}'</pre>
          </div>

          <div id="keys-list-container">
            <div style="text-align: center; padding: 60px; color: var(--text-muted);">
              Carregando chaves de API...
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

  const listContainer = container.querySelector('#keys-list-container') as HTMLElement;

  const loadKeys = async () => {
    try {
      const keys = await api.getApiKeys();

      if (keys.length === 0) {
        listContainer.innerHTML = `
          <div class="card" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">🔑</div>
            <h3 style="margin-bottom: 8px;">Nenhuma API Key gerada</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px;">
              Gere chaves seguras para permitir que seus sistemas ERP, CRM ou plataformas parceiras enviem dados e gerem documentos automaticamente.
            </p>
            <button id="empty-generate-key-btn" class="btn btn-primary">
              🔑 Gerar Primeira API Key
            </button>
          </div>
        `;
        listContainer.querySelector('#empty-generate-key-btn')?.addEventListener('click', openGenerateKeyModal);
        return;
      }

      listContainer.innerHTML = `
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Nome da Integração</th>
                <th>Prefixo da Chave</th>
                <th>Status</th>
                <th>Último Uso</th>
                <th>Criada em</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${keys
                .map((k: any) => {
                  const isRevoked = Boolean(k.revokedAt);
                  const statusClass = isRevoked ? 'badge-archived' : 'badge-published';
                  const statusText = isRevoked ? 'REVOGADA' : 'ATIVA';

                  return `
                  <tr>
                    <td style="font-weight: 600; color: #fff;">${k.name}</td>
                    <td>
                      <code style="background: var(--bg-surface); padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.85rem; color: #a5b4fc;">
                        ${k.keyPrefix}...
                      </code>
                    </td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td style="color: var(--text-secondary); font-size: 0.85rem;">
                      ${k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleString('pt-BR') : 'Nunca utilizada'}
                    </td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">
                      ${new Date(k.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td style="text-align: right;">
                      ${
                        !isRevoked
                          ? `
                        <button class="btn btn-danger revoke-key-btn" data-key-id="${k.id}" data-name="${k.name}" style="padding: 6px 12px; font-size: 0.8rem;">
                          Revogar
                        </button>
                      `
                          : `<span style="color: var(--text-muted); font-size: 0.8rem;">Revogada em ${new Date(k.revokedAt).toLocaleDateString('pt-BR')}</span>`
                      }
                    </td>
                  </tr>
                `;
                })
                .join('')}
            </tbody>
          </table>
        </div>
      `;

      // Attach revoke handlers
      listContainer.querySelectorAll('.revoke-key-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.keyId!;
          const name = (e.currentTarget as HTMLElement).dataset.name!;
          modal.confirm(
            'Revogar API Key',
            `Deseja realmente revogar a chave "<strong>${name}</strong>"? Sistemas externos que utilizam esta chave perderão o acesso imediatamente.`,
            async () => {
              try {
                await api.revokeApiKey(id);
                toast.success('API Key revogada com sucesso.');
                loadKeys();
              } catch (err: any) {
                toast.error(`Erro ao revogar chave: ${err.message}`);
              }
            },
          );
        });
      });
    } catch (err: any) {
      listContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px; color: var(--danger);">
          <p>Erro ao carregar API Keys: ${err.message}</p>
        </div>
      `;
    }
  };

  const openGenerateKeyModal = () => {
    modal.open({
      title: 'Gerar Nova API Key de Integração',
      bodyHtml: `
        <form id="api-key-form">
          <div class="form-group">
            <label class="form-label">Nome da Aplicação / Sistema Consumidor *</label>
            <input
              type="text"
              id="key-name-input"
              class="form-control"
              placeholder="ex: Sistema ERP Protheus ou CRM Salesforce"
              required
            />
          </div>
        </form>
      `,
      confirmText: 'Gerar Chave',
      onConfirm: async (overlay) => {
        const name = (overlay.querySelector('#key-name-input') as HTMLInputElement).value.trim();
        if (!name) {
          toast.warning('O nome da aplicação é obrigatório.');
          return false;
        }

        try {
          const created = await api.createApiKey(name);
          // Show one-time copy modal (Section 34)
          modal.open({
            title: '🔑 API Key Gerada com Sucesso!',
            bodyHtml: `
              <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: var(--radius-md); padding: 14px; margin-bottom: 16px; color: #fbbf24; font-size: 0.88rem;">
                ⚠️ <strong>Atenção:</strong> Copie sua chave agora! Por motivos de segurança, este valor não poderá ser exibido novamente.
              </div>
              <div class="form-group">
                <label class="form-label">Sua Chave de API:</label>
                <div style="display: flex; gap: 8px;">
                  <input
                    type="text"
                    id="generated-key-display"
                    class="form-control"
                    value="${created.apiKey}"
                    readonly
                    style="font-family: var(--font-mono); color: #a5b4fc; background: var(--bg-dark);"
                  />
                  <button id="copy-generated-key-btn" class="btn btn-primary" style="white-space: nowrap;">
                    📋 Copiar
                  </button>
                </div>
              </div>
            `,
            confirmText: 'Concluir',
            cancelText: '',
            onConfirm: () => {
              loadKeys();
            },
          });

          setTimeout(() => {
            document.querySelector('#copy-generated-key-btn')?.addEventListener('click', () => {
              navigator.clipboard.writeText(created.apiKey);
              toast.success('Chave copiada para a área de transferência!');
            });
          }, 50);
        } catch (err: any) {
          toast.error(`Erro ao gerar API Key: ${err.message}`);
          return false;
        }
      },
    });
  };

  container.querySelector('#generate-key-btn')?.addEventListener('click', openGenerateKeyModal);
  loadKeys();
}
