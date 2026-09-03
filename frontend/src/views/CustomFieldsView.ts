import { api } from '../services/api';
import { toast } from '../services/toast';
import { modal } from '../services/modal';
import { renderSidebar } from '../components/Sidebar';

export async function renderCustomFieldsView(container: HTMLElement) {
  container.innerHTML = `
    <div class="app-layout">
      ${renderSidebar('custom-fields')}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">Catálogo de Campos Customizados</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Defina conceitos de negócio padronizados para uso nos documentos e integrações</p>
          </div>
          <button id="new-custom-field-btn" class="btn btn-primary">
            ➕ Novo Campo
          </button>
        </header>

        <div class="page-container">
          <div id="fields-list-container">
            <div style="text-align: center; padding: 60px; color: var(--text-muted);">
              Carregando catálogo...
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

  const listContainer = container.querySelector('#fields-list-container') as HTMLElement;

  const loadFields = async () => {
    try {
      const fields = await api.getCustomFields();

      if (fields.length === 0) {
        listContainer.innerHTML = `
          <div class="card" style="text-align: center; padding: 60px 20px;">
            <div style="font-size: 3rem; margin-bottom: 16px;">🏷️</div>
            <h3 style="margin-bottom: 8px;">Nenhum campo personalizado criado</h3>
            <p style="color: var(--text-secondary); max-width: 480px; margin: 0 auto 24px;">
              Crie conceitos de integração como <code>nomePaciente</code>, <code>numeroContrato</code> ou campos padronizados para acelerar a criação de documentos.
            </p>
            <button id="empty-new-field-btn" class="btn btn-primary">
              ➕ Criar Primeiro Campo
            </button>
          </div>
        `;
        listContainer.querySelector('#empty-new-field-btn')?.addEventListener('click', openFieldModal);
        return;
      }

      listContainer.innerHTML = `
        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Chave (Key)</th>
                <th>Rótulo (Label)</th>
                <th>Tipo</th>
                <th>Modo de Entrada</th>
                <th>Máscara / Validações</th>
                <th style="text-align: right;">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${fields
                .map((f: any) => {
                  const modeClass =
                    f.inputMode === 'INTEGRATION' ? 'badge-integration' : 'badge-manual';
                  const mask = f.formatting?.mask || '-';

                  return `
                  <tr>
                    <td>
                      <code style="background: var(--bg-surface); padding: 3px 8px; border-radius: 4px; font-family: var(--font-mono); font-size: 0.85rem; color: #a5b4fc; font-weight: 600;">
                        ${f.key}
                      </code>
                    </td>
                    <td style="font-weight: 600; color: #fff;">${f.label}</td>
                    <td><span class="badge badge-draft">${f.type}</span></td>
                    <td><span class="badge ${modeClass}">${f.inputMode}</span></td>
                    <td style="color: var(--text-secondary); font-size: 0.85rem;">
                      ${mask !== '-' ? `<span style="color: var(--accent); font-family: var(--font-mono);">${mask}</span>` : 'Padrão'}
                    </td>
                    <td style="text-align: right;">
                      <div style="display: inline-flex; gap: 8px;">
                        <button class="btn btn-secondary edit-field-btn" data-field-id="${f.id}" style="padding: 6px 12px; font-size: 0.82rem;">
                          ✏️ Editar
                        </button>
                        <button class="btn-icon delete-field-btn" data-field-id="${f.id}" data-key="${f.key}" title="Excluir">
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

      // Attach edit handlers
      listContainer.querySelectorAll('.edit-field-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.fieldId!;
          const field = fields.find((f: any) => f.id === id);
          if (field) openFieldModal(field);
        });
      });

      // Attach delete handlers
      listContainer.querySelectorAll('.delete-field-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          const id = (e.currentTarget as HTMLElement).dataset.fieldId!;
          const key = (e.currentTarget as HTMLElement).dataset.key!;
          modal.confirm(
            'Excluir Campo Personalizado',
            `Deseja realmente remover o campo personalizado <code>${key}</code>? Se este campo estiver em uso por versões publicadas, a exclusão será bloqueada.`,
            async () => {
              try {
                await api.deleteCustomField(id);
                toast.success('Campo excluído com sucesso.');
                loadFields();
              } catch (err: any) {
                toast.error(`Erro ao excluir: ${err.message}`);
              }
            },
          );
        });
      });
    } catch (err: any) {
      listContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 40px; color: var(--danger);">
          <p>Erro ao carregar catálogo: ${err.message}</p>
        </div>
      `;
    }
  };

  const openFieldModal = (editingField?: any) => {
    const isEdit = Boolean(editingField);
    modal.open({
      title: isEdit ? `Editar Campo: ${editingField.key}` : 'Novo Campo Personalizado',
      bodyHtml: `
        <form id="custom-field-form">
          <div class="form-group">
            <label class="form-label">Chave Única (Key) *</label>
            <input
              type="text"
              id="field-key-input"
              class="form-control"
              placeholder="ex: nomePaciente ou codigoContrato"
              value="${editingField?.key || ''}"
              ${isEdit ? 'disabled' : 'required'}
            />
          </div>

          <div class="form-group">
            <label class="form-label">Rótulo Legível (Label) *</label>
            <input
              type="text"
              id="field-label-input"
              class="form-control"
              placeholder="ex: Nome Completo do Paciente"
              value="${editingField?.label || ''}"
              required
            />
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div class="form-group">
              <label class="form-label">Tipo de Dado</label>
              <select id="field-type-select" class="form-control">
                <option value="TEXT" ${editingField?.type === 'TEXT' ? 'selected' : ''}>Texto (TEXT)</option>
                <option value="NUMBER" ${editingField?.type === 'NUMBER' ? 'selected' : ''}>Número (NUMBER)</option>
                <option value="DATE" ${editingField?.type === 'DATE' ? 'selected' : ''}>Data (DATE)</option>
                <option value="IMAGE" ${editingField?.type === 'IMAGE' ? 'selected' : ''}>Imagem (IMAGE)</option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label">Modo de Entrada</label>
              <select id="field-mode-select" class="form-control">
                <option value="INTEGRATION" ${editingField?.inputMode === 'INTEGRATION' ? 'selected' : ''}>⚡ INTEGRATION (API)</option>
                <option value="MANUAL" ${editingField?.inputMode === 'MANUAL' ? 'selected' : ''}>✍️ MANUAL (Público)</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Máscara Pré-definida (Opcional)</label>
            <select id="field-mask-select" class="form-control">
              <option value="" ${!editingField?.formatting?.mask ? 'selected' : ''}>Nenhuma</option>
              <option value="CPF" ${editingField?.formatting?.mask === 'CPF' ? 'selected' : ''}>CPF (000.000.000-00)</option>
              <option value="CNPJ" ${editingField?.formatting?.mask === 'CNPJ' ? 'selected' : ''}>CNPJ (00.000.000/0000-00)</option>
              <option value="CEP" ${editingField?.formatting?.mask === 'CEP' ? 'selected' : ''}>CEP (00000-000)</option>
              <option value="PHONE" ${editingField?.formatting?.mask === 'PHONE' ? 'selected' : ''}>Telefone ((00) 00000-0000)</option>
            </select>
          </div>
        </form>
      `,
      confirmText: isEdit ? 'Salvar Alterações' : 'Criar Campo',
      onConfirm: async (overlay) => {
        const key = (overlay.querySelector('#field-key-input') as HTMLInputElement).value.trim();
        const label = (overlay.querySelector('#field-label-input') as HTMLInputElement).value.trim();
        const type = (overlay.querySelector('#field-type-select') as HTMLSelectElement).value;
        const inputMode = (overlay.querySelector('#field-mode-select') as HTMLSelectElement).value;
        const mask = (overlay.querySelector('#field-mask-select') as HTMLSelectElement).value;

        if (!key || !label) {
          toast.warning('Chave e rótulo são obrigatórios.');
          return false;
        }

        const payload: any = {
          key,
          label,
          type,
          inputMode,
          formatting: mask ? { mask } : undefined,
        };

        try {
          if (isEdit) {
            await api.updateCustomField(editingField.id, payload);
            toast.success('Campo atualizado com sucesso!');
          } else {
            await api.createCustomField(payload);
            toast.success('Campo criado no catálogo!');
          }
          loadFields();
        } catch (err: any) {
          toast.error(`Erro ao salvar campo: ${err.message}`);
          return false;
        }
      },
    });
  };

  container.querySelector('#new-custom-field-btn')?.addEventListener('click', () => openFieldModal());
  loadFields();
}
