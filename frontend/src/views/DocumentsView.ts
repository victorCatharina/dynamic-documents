import { api } from '../services/api';
import { toast } from '../services/toast';
import { modal } from '../services/modal';
import { renderSidebar } from '../components/Sidebar';

export async function renderDocumentsView(container: HTMLElement) {
  container.innerHTML = `
    <div class="app-layout">
      ${renderSidebar('documents')}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">Documentos</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Gerencie seus templates, versões e formulários dinâmicos</p>
          </div>
          <div style="display: flex; gap: 12px;">
            <button id="import-doc-btn" class="btn btn-secondary">
              📥 Importar PDF / DOCX
            </button>
            <button id="new-doc-btn" class="btn btn-primary">
              ➕ Novo Documento
            </button>
          </div>
        </header>

        <div class="page-container">
          <div class="card" style="margin-bottom: 24px; padding: 16px 20px;">
            <div style="display: flex; gap: 16px; align-items: center; justify-content: space-between; flex-wrap: wrap;">
              <div style="display: flex; gap: 12px; flex: 1; min-width: 280px;">
                <input
                  type="text"
                  id="search-input"
                  class="form-control"
                  placeholder="Buscar por nome ou descrição..."
                />
              </div>
              <div style="display: flex; gap: 12px; align-items: center;">
                <select id="status-filter" class="form-control" style="width: 160px;">
                  <option value="">Todos os Status</option>
                  <option value="DRAFT">Rascunho (DRAFT)</option>
                  <option value="PUBLISHED">Publicado (PUBLISHED)</option>
                  <option value="ARCHIVED">Arquivado (ARCHIVED)</option>
                </select>
                <button id="refresh-btn" class="btn btn-secondary btn-icon" title="Recarregar">
                  🔄
                </button>
              </div>
            </div>
          </div>

          <div id="docs-list-container">
            <div style="text-align: center; padding: 60px; color: var(--text-muted);">
              <span style="font-size: 2rem;">⏳</span><br />
              Carregando documentos...
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

  const listContainer = container.querySelector('#docs-list-container') as HTMLElement;
  const searchInput = container.querySelector('#search-input') as HTMLInputElement;
  const statusFilter = container.querySelector('#status-filter') as HTMLSelectElement;

  const loadDocuments = async () => {
    try {
      const search = searchInput.value.trim();
      const status = statusFilter.value;
      const response = await api.getDocuments({ search, status });
      const docs = response.data || [];

      if (docs.length === 0) {
        listContainer.innerHTML = `
          <div class="card" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">📄</div>
            <h3 style="margin-bottom: 8px;">Nenhum documento encontrado</h3>
            <p style="color: var(--text-secondary); max-width: 460px; margin: 0 auto 24px;">
              Crie seu primeiro documento dinâmico do zero ou importe um PDF/DOCX existente como plano de fundo.
            </p>
            <button id="empty-new-doc-btn" class="btn btn-primary">
              ➕ Criar Primeiro Documento
            </button>
          </div>
        `;
        listContainer.querySelector('#empty-new-doc-btn')?.addEventListener('click', openNewDocModal);
        return;
      }

      listContainer.innerHTML = `
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Documento</th>
                <th>Status</th>
                <th>Versões</th>
                <th>Token Público</th>
                <th>Criado em</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${docs
                .map((doc: any) => {
                  const versionCount = doc.versions?.length || 1;
                  const latestVersion = doc.versions?.[0]?.versionNumber || 1;
                  const statusClass = `badge-${doc.status.toLowerCase()}`;
                  const publicUrl = `${window.location.origin}/#/form/${doc.publicToken}`;

                  return `
                  <tr data-doc-id="${doc.id}">
                    <td>
                      <div style="font-weight: 600; color: #fff; font-size: 0.95rem;">${doc.name}</div>
                      ${doc.description ? `<div style="font-size: 0.8rem; color: var(--text-muted);">${doc.description}</div>` : ''}
                    </td>
                    <td>
                      <span class="badge ${statusClass}">${doc.status}</span>
                    </td>
                    <td>
                      <span style="font-weight: 600; color: var(--accent);">v${latestVersion}</span>
                      <span style="color: var(--text-muted); font-size: 0.8rem;">(${versionCount} versão${versionCount > 1 ? 'ões' : ''})</span>
                    </td>
                    <td>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <code style="background: var(--bg-surface); padding: 2px 6px; border-radius: 4px; font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-secondary);">
                          ${doc.publicToken.slice(0, 10)}...
                        </code>
                        <button class="btn-icon copy-link-btn" data-url="${publicUrl}" title="Copiar link público">
                          📋
                        </button>
                        <a href="#/form/${doc.publicToken}" target="_blank" class="btn-icon" title="Abrir formulário público">
                          🔗
                        </a>
                      </div>
                    </td>
                    <td style="color: var(--text-muted); font-size: 0.85rem;">
                      ${new Date(doc.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                    <td style="text-align: right;">
                      <div style="display: inline-flex; gap: 8px;">
                        <button class="btn btn-primary open-builder-btn" data-doc-id="${doc.id}" style="padding: 6px 12px; font-size: 0.82rem;">
                          ✏️ Editor
                        </button>
                        <button class="btn-icon schema-btn" data-doc-id="${doc.id}" title="Ver Schema da API">
                          ⚡
                        </button>
                        <button class="btn-icon delete-doc-btn" data-doc-id="${doc.id}" data-name="${doc.name}" title="Excluir">
                          🗑️
                        </button>
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

      // Attach row actions
      listContainer.querySelectorAll('.open-builder-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const docId = (e.currentTarget as HTMLElement).dataset.docId;
          window.location.hash = `#/builder/${docId}`;
        });
      });

      listContainer.querySelectorAll('.copy-link-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const url = (e.currentTarget as HTMLElement).dataset.url || '';
          navigator.clipboard.writeText(url);
          toast.success('Link do formulário copiado para a área de transferência!');
        });
      });

      listContainer.querySelectorAll('.schema-btn').forEach((btn) => {
        btn.addEventListener('click', async (e) => {
          const docId = (e.currentTarget as HTMLElement).dataset.docId!;
          try {
            const schema = await api.getSchema(docId);
            modal.open({
              title: `Schema da API — ${schema.documentName}`,
              bodyHtml: `
                <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 12px;">
                  Contrato de dados esperado para submissão via API (versão v${schema.version}):
                </p>
                <pre style="background: var(--bg-dark); padding: 14px; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.82rem; color: #a5b4fc; max-height: 380px; overflow: auto;">${JSON.stringify(schema, null, 2)}</pre>
              `,
              cancelText: 'Fechar',
              confirmText: 'Copiar JSON',
              onConfirm: () => {
                navigator.clipboard.writeText(JSON.stringify(schema, null, 2));
                toast.success('Schema copiado para a área de transferência!');
              },
            });
          } catch (err: any) {
            toast.error(`Erro ao carregar schema: ${err.message}`);
          }
        });
      });

      listContainer.querySelectorAll('.delete-doc-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const docId = (e.currentTarget as HTMLElement).dataset.docId!;
          const docName = (e.currentTarget as HTMLElement).dataset.name!;
          modal.confirm(
            'Excluir Documento',
            `Deseja realmente remover o documento "<strong>${docName}</strong>"? Esta ação moverá o documento para a lixeira.`,
            async () => {
              try {
                await api.deleteDocument(docId);
                toast.success('Documento excluído com sucesso.');
                loadDocuments();
              } catch (err: any) {
                toast.error(`Erro ao excluir documento: ${err.message}`);
              }
            },
          );
        });
      });
    } catch (err: any) {
      listContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px; color: var(--danger);">
          <p>Erro ao carregar documentos: ${err.message}</p>
          <button id="retry-btn" class="btn btn-secondary" style="margin-top: 12px;">Tentar Novamente</button>
        </div>
      `;
      listContainer.querySelector('#retry-btn')?.addEventListener('click', loadDocuments);
    }
  };

  const openNewDocModal = () => {
    modal.open({
      title: 'Criar Novo Documento',
      bodyHtml: `
        <form id="create-doc-form">
          <div class="form-group">
            <label class="form-label">Nome do Documento *</label>
            <input type="text" id="doc-name-input" class="form-control" placeholder="ex: Contrato de Prestação de Serviços" required />
          </div>
          <div class="form-group">
            <label class="form-label">Descrição (Opcional)</label>
            <textarea id="doc-desc-input" class="form-control" rows="3" placeholder="Finalidade deste documento..."></textarea>
          </div>
        </form>
      `,
      confirmText: 'Criar e Abrir no Builder',
      onConfirm: async (overlay) => {
        const name = (overlay.querySelector('#doc-name-input') as HTMLInputElement).value.trim();
        const description = (overlay.querySelector('#doc-desc-input') as HTMLTextAreaElement).value.trim();

        if (!name) {
          toast.warning('O nome do documento é obrigatório.');
          return false;
        }

        try {
          const newDoc = await api.createDocument({ name, description });
          toast.success('Documento criado com sucesso!');
          window.location.hash = `#/builder/${newDoc.id}`;
        } catch (err: any) {
          toast.error(`Erro ao criar documento: ${err.message}`);
          return false;
        }
      },
    });
  };

  const openImportModal = () => {
    modal.open({
      title: 'Importar PDF ou DOCX como Background',
      bodyHtml: `
        <p style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 16px;">
          Selecione um documento existente ou crie um novo para importar as páginas como plano de fundo.
        </p>
        <div class="form-group">
          <label class="form-label">Nome do Novo Documento</label>
          <input type="text" id="import-doc-name" class="form-control" placeholder="ex: Contrato Importado" required />
        </div>
        <div class="form-group">
          <label class="form-label">Arquivo (.pdf ou .docx)</label>
          <input type="file" id="import-file-input" class="form-control" accept=".pdf,.docx" required />
        </div>
      `,
      confirmText: 'Importar e Abrir Editor',
      onConfirm: async (overlay) => {
        const name = (overlay.querySelector('#import-doc-name') as HTMLInputElement).value.trim();
        const fileInput = overlay.querySelector('#import-file-input') as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (!name) {
          toast.warning('Nome do documento é obrigatório.');
          return false;
        }
        if (!file) {
          toast.warning('Selecione um arquivo PDF ou DOCX.');
          return false;
        }

        try {
          const newDoc = await api.createDocument({ name });
          if (file.name.endsWith('.pdf')) {
            await api.importPdf(newDoc.id, file);
          } else {
            await api.importDocx(newDoc.id, file);
          }
          toast.success('Arquivo importado com sucesso!');
          window.location.hash = `#/builder/${newDoc.id}`;
        } catch (err: any) {
          toast.error(`Erro na importação: ${err.message}`);
          return false;
        }
      },
    });
  };

  // Attach button events
  container.querySelector('#new-doc-btn')?.addEventListener('click', openNewDocModal);
  container.querySelector('#import-doc-btn')?.addEventListener('click', openImportModal);
  container.querySelector('#refresh-btn')?.addEventListener('click', loadDocuments);
  searchInput.addEventListener('input', () => {
    loadDocuments();
  });
  statusFilter.addEventListener('change', () => {
    loadDocuments();
  });

  // Initial load
  loadDocuments();
}
