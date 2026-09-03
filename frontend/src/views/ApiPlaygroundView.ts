import { api } from '../services/api';
import { toast } from '../services/toast';
import { renderSidebar } from '../components/Sidebar';

export async function renderApiPlaygroundView(container: HTMLElement) {
  container.innerHTML = `
    <div class="app-layout">
      ${renderSidebar('playground')}
      <main class="main-content">
        <header class="top-bar">
          <div>
            <h1 style="font-size: 1.3rem; font-weight: 700;">API Playground & Integrações</h1>
            <p style="color: var(--text-muted); font-size: 0.82rem;">Simule requisições de sistemas externos usando API Keys</p>
          </div>
        </header>

        <div class="page-container" style="max-width: 1200px;">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <!-- Left Config & Payload -->
            <div class="card">
              <h3 style="font-size: 1.05rem; font-weight: 700; margin-bottom: 16px; color: #fff;">
                🚀 Configuração da Requisição
              </h3>

              <div class="form-group">
                <label class="form-label">Selecione o Documento</label>
                <select id="play-doc-select" class="form-control">
                  <option value="">Carregando documentos...</option>
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">API Key de Integração</label>
                <input
                  type="text"
                  id="play-api-key"
                  class="form-control"
                  placeholder="dd_live_..."
                  value=""
                />
              </div>

              <div class="form-group">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <label class="form-label" style="margin: 0;">Payload de Dados (JSON)</label>
                  <button id="generate-sample-payload-btn" class="btn btn-secondary" style="padding: 2px 8px; font-size: 0.75rem;">
                    🪄 Gerar Payload Exemplo
                  </button>
                </div>
                <textarea
                  id="play-payload"
                  class="form-control"
                  rows="10"
                  style="font-family: var(--font-mono); font-size: 0.85rem; color: #a5b4fc; background: var(--bg-dark);"
                  placeholder='{\n  "data": {\n    "nomeCliente": "João Silva",\n    "nomePaciente": "Maria Silva"\n  }\n}'
                ></textarea>
              </div>

              <div style="display: flex; gap: 12px; margin-top: 20px;">
                <button id="send-validate-btn" class="btn btn-secondary" style="flex: 1;">
                  🔍 Apenas Validar
                </button>
                <button id="send-submit-btn" class="btn btn-primary" style="flex: 1.5;">
                  ⚡ Executar Submissão (Gerar PDF)
                </button>
              </div>
            </div>

            <!-- Right Response Area -->
            <div class="card" style="display: flex; flex-direction: column;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <h3 style="font-size: 1.05rem; font-weight: 700; color: #fff;">
                  📡 Resposta do Servidor
                </h3>
                <span id="response-status-badge" class="badge badge-draft" style="display: none;">
                  Status: 200 OK
                </span>
              </div>

              <div id="response-preview-box" style="flex: 1; min-height: 280px; background: var(--bg-dark); border-radius: var(--radius-md); padding: 16px; border: 1px solid var(--border-subtle); overflow: auto;">
                <div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding-top: 80px;">
                  Envie uma requisição para inspecionar a resposta da API aqui.
                </div>
              </div>

              <div id="pdf-download-action-box" style="margin-top: 16px; display: none;">
                <a id="pdf-download-link" href="#" target="_blank" class="btn btn-success" style="width: 100%; text-align: center;">
                  📄 Abrir Documento PDF Gerado
                </a>
              </div>
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

  const docSelect = container.querySelector('#play-doc-select') as HTMLSelectElement;
  const apiKeyInput = container.querySelector('#play-api-key') as HTMLInputElement;
  const payloadInput = container.querySelector('#play-payload') as HTMLTextAreaElement;
  const responseBox = container.querySelector('#response-preview-box') as HTMLElement;
  const statusBadge = container.querySelector('#response-status-badge') as HTMLElement;
  const downloadBox = container.querySelector('#pdf-download-action-box') as HTMLElement;
  const downloadLink = container.querySelector('#pdf-download-link') as HTMLAnchorElement;

  let currentSchema: any = null;

  // Load documents
  try {
    const docsRes = await api.getDocuments();
    const docs = docsRes.data || [];
    docSelect.innerHTML = docs
      .map((d: any) => `<option value="${d.id}">${d.name} (${d.status})</option>`)
      .join('');

    if (docs.length > 0) {
      loadDocSchema(docs[0].id);
    } else {
      docSelect.innerHTML = '<option value="">Nenhum documento disponível</option>';
    }
  } catch (err: any) {
    docSelect.innerHTML = `<option value="">Erro: ${err.message}</option>`;
  }

  async function loadDocSchema(docId: string) {
    try {
      currentSchema = await api.getSchema(docId);
      generateSample();
    } catch {
      currentSchema = null;
    }
  }

  function generateSample() {
    if (!currentSchema || !currentSchema.fields) return;
    const sampleData: Record<string, any> = {};
    currentSchema.fields.forEach((f: any) => {
      if (f.type === 'NUMBER') sampleData[f.key] = 1500;
      else if (f.type === 'DATE') sampleData[f.key] = '2026-09-02';
      else if (f.mask === 'CPF') sampleData[f.key] = '12345678900';
      else if (f.mask === 'CNPJ') sampleData[f.key] = '12345678000199';
      else sampleData[f.key] = `Valor de ${f.label || f.key}`;
    });
    payloadInput.value = JSON.stringify({ data: sampleData }, null, 2);
  }

  docSelect.addEventListener('change', () => {
    if (docSelect.value) loadDocSchema(docSelect.value);
  });

  container.querySelector('#generate-sample-payload-btn')?.addEventListener('click', () => {
    generateSample();
    toast.info('Payload exemplo gerado com base no schema.');
  });

  const sendRequest = async (isValidationOnly: boolean) => {
    const docId = docSelect.value;
    const rawApiKey = apiKeyInput.value.trim();
    let body: any;

    if (!docId) {
      toast.warning('Selecione um documento.');
      return;
    }

    try {
      body = JSON.parse(payloadInput.value);
    } catch {
      toast.error('O payload deve ser um JSON válido.');
      return;
    }

    responseBox.innerHTML = `<div style="color: var(--text-muted); font-size: 0.85rem; text-align: center; padding-top: 80px;">⏳ Enviando requisição...</div>`;
    statusBadge.style.display = 'none';
    downloadBox.style.display = 'none';

    const endpoint = isValidationOnly
      ? `/api/v1/documents/${docId}/validate`
      : `/api/v1/documents/${docId}/submissions`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (rawApiKey) {
      headers['Authorization'] = `Bearer ${rawApiKey}`;
    } else {
      const token = api.getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const resData = await res.json();
      statusBadge.style.display = 'inline-flex';
      statusBadge.className = `badge ${res.ok ? 'badge-published' : 'badge-archived'}`;
      statusBadge.innerText = `${res.status} ${res.statusText || (res.ok ? 'OK' : 'Error')}`;

      responseBox.innerHTML = `
        <pre style="font-family: var(--font-mono); font-size: 0.82rem; color: ${res.ok ? '#34d399' : '#f87171'}; margin: 0;">${JSON.stringify(resData, null, 2)}</pre>
      `;

      if (res.ok && resData.documentUrl) {
        downloadBox.style.display = 'block';
        downloadLink.href = resData.documentUrl;
        toast.success('Documento gerado com sucesso!');
      } else if (res.ok) {
        toast.success('Validação concluída com sucesso.');
      } else {
        toast.error(`Falha na requisição: ${resData.message || 'Erro'}`);
      }
    } catch (err: any) {
      responseBox.innerHTML = `
        <div style="color: var(--danger); font-size: 0.85rem;">Erro de conexão: ${err.message}</div>
      `;
    }
  };

  container.querySelector('#send-submit-btn')?.addEventListener('click', () => sendRequest(false));
  container.querySelector('#send-validate-btn')?.addEventListener('click', () => sendRequest(true));
}
