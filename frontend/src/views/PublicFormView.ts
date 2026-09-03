import { api } from '../services/api';
import { toast } from '../services/toast';

export async function renderPublicFormView(container: HTMLElement, token: string) {
  container.innerHTML = `
    <div style="min-height: 100vh; background: radial-gradient(circle at top, #1e1b4b 0%, #090d16 100%); padding: 40px 20px; display: flex; flex-direction: column; align-items: center;">
      <div style="width: 100%; max-width: 680px;">
        <!-- Brand Header -->
        <div style="text-align: center; margin-bottom: 28px;">
          <div class="brand-icon" style="margin: 0 auto 12px; width: 44px; height: 44px; font-size: 1.3rem;">D</div>
          <div style="font-size: 0.8rem; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px;">
            Dynamic Documents
          </div>
          <h1 id="public-doc-title" style="font-size: 1.8rem; font-weight: 800; color: #fff;">
            Carregando formulário...
          </h1>
          <p id="public-doc-desc" style="color: var(--text-secondary); font-size: 0.95rem; margin-top: 6px;">
            Por favor, preencha as informações abaixo para gerar seu documento.
          </p>
        </div>

        <!-- Form Card Container -->
        <div id="form-container" class="card" style="padding: 32px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
          <div style="text-align: center; padding: 40px; color: var(--text-muted);">
            ⏳ Carregando campos do formulário...
          </div>
        </div>

        <!-- Footer -->
        <div style="text-align: center; margin-top: 24px; font-size: 0.8rem; color: var(--text-muted);">
          Ambiente seguro • Powered by Dynamic Documents Platform
        </div>
      </div>
    </div>
  `;

  const titleEl = container.querySelector('#public-doc-title') as HTMLElement;
  const descEl = container.querySelector('#public-doc-desc') as HTMLElement;
  const formContainer = container.querySelector('#form-container') as HTMLElement;

  try {
    const formData = await api.getPublicForm(token);
    titleEl.innerText = formData.documentName;
    if (formData.description) {
      descEl.innerText = formData.description;
    }

    const fields = formData.fields || [];

    if (fields.length === 0) {
      formContainer.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">ℹ️</div>
          <h3 style="margin-bottom: 8px;">Nenhum campo para preenchimento manual</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 20px;">
            Este documento é preenchido exclusivamente por sistemas externos via integração de API.
          </p>
        </div>
      `;
      return;
    }

    // Render Fields dynamically
    formContainer.innerHTML = `
      <form id="dynamic-public-form">
        <div style="display: flex; flex-direction: column; gap: 18px; margin-bottom: 28px;">
          ${fields
            .map((field: any) => {
              const isRequired = Boolean(field.required);
              const label = field.label || field.key;
              const requiredMark = isRequired ? '<span style="color: var(--danger);">*</span>' : '';
              const inputType =
                field.type === 'NUMBER' ? 'number' : field.type === 'DATE' ? 'date' : 'text';

              let placeholder = `Informe ${label.toLowerCase()}`;
              if (field.mask === 'CPF') placeholder = '000.000.000-00';
              if (field.mask === 'CNPJ') placeholder = '00.000.000/0000-00';
              if (field.mask === 'CEP') placeholder = '00000-000';
              if (field.mask === 'PHONE') placeholder = '(00) 00000-0000';

              return `
              <div class="form-group" style="margin-bottom: 0;">
                <label class="form-label" for="field-input-${field.key}">
                  ${label} ${requiredMark}
                </label>
                <input
                  type="${inputType}"
                  id="field-input-${field.key}"
                  name="${field.key}"
                  class="form-control"
                  placeholder="${placeholder}"
                  data-mask="${field.mask || ''}"
                  data-type="${field.type}"
                  ${isRequired ? 'required' : ''}
                  ${field.validation?.minLength ? `minlength="${field.validation.minLength}"` : ''}
                  ${field.validation?.maxLength ? `maxlength="${field.validation.maxLength}"` : ''}
                  ${field.validation?.min !== undefined ? `min="${field.validation.min}"` : ''}
                  ${field.validation?.max !== undefined ? `max="${field.validation.max}"` : ''}
                />
              </div>
            `;
            })
            .join('')}
        </div>

        <button type="submit" id="submit-form-btn" class="btn btn-primary" style="width: 100%; padding: 14px; font-size: 1rem; border-radius: var(--radius-md);">
          🚀 Gerar Documento PDF
        </button>
      </form>
    `;

    const form = formContainer.querySelector('#dynamic-public-form') as HTMLFormElement;
    const submitBtn = formContainer.querySelector('#submit-form-btn') as HTMLButtonElement;

    // Attach real-time input masks
    form.querySelectorAll('input').forEach((input) => {
      const mask = input.dataset.mask;
      if (mask) {
        input.addEventListener('input', () => {
          let val = input.value;
          if (mask === 'CPF') {
            val = val.replace(/\D/g, '').slice(0, 11);
            if (val.length > 9) val = `${val.slice(0, 3)}.${val.slice(3, 6)}.${val.slice(6, 9)}-${val.slice(9)}`;
            else if (val.length > 6) val = `${val.slice(0, 3)}.${val.slice(3, 6)}.${val.slice(6)}`;
            else if (val.length > 3) val = `${val.slice(0, 3)}.${val.slice(3)}`;
            input.value = val;
          } else if (mask === 'CNPJ') {
            val = val.replace(/\D/g, '').slice(0, 14);
            if (val.length > 12) val = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5, 8)}/${val.slice(8, 12)}-${val.slice(12)}`;
            else if (val.length > 8) val = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5, 8)}/${val.slice(8)}`;
            else if (val.length > 5) val = `${val.slice(0, 2)}.${val.slice(2, 5)}.${val.slice(5)}`;
            else if (val.length > 2) val = `${val.slice(0, 2)}.${val.slice(2)}`;
            input.value = val;
          } else if (mask === 'CEP') {
            val = val.replace(/\D/g, '').slice(0, 8);
            if (val.length > 5) val = `${val.slice(0, 5)}-${val.slice(5)}`;
            input.value = val;
          } else if (mask === 'PHONE') {
            val = val.replace(/\D/g, '').slice(0, 11);
            if (val.length > 10) val = `(${val.slice(0, 2)}) ${val.slice(2, 7)}-${val.slice(7)}`;
            else if (val.length > 6) val = `(${val.slice(0, 2)}) ${val.slice(2, 6)}-${val.slice(6)}`;
            else if (val.length > 2) val = `(${val.slice(0, 2)}) ${val.slice(2)}`;
            input.value = val;
          }
        });
      }
    });

    // Handle Form Submit
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payloadData: Record<string, any> = {};

      fields.forEach((field: any) => {
        const input = form.querySelector(`[name="${field.key}"]`) as HTMLInputElement;
        if (input && input.value !== '') {
          if (field.type === 'NUMBER') {
            payloadData[field.key] = Number(input.value);
          } else {
            payloadData[field.key] = input.value;
          }
        }
      });

      submitBtn.disabled = true;
      submitBtn.innerHTML = `⏳ Processando e Gerando PDF...`;

      try {
        const result = await api.submitPublicForm(token, payloadData);
        toast.success('Documento gerado com sucesso!');

        // Render Success View with PDF preview
        formContainer.innerHTML = `
          <div style="text-align: center; padding: 20px 0;">
            <div style="font-size: 3.5rem; margin-bottom: 16px;">🎉</div>
            <h2 style="font-size: 1.5rem; font-weight: 800; color: #fff; margin-bottom: 8px;">
              Documento Gerado com Sucesso!
            </h2>
            <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 24px;">
              Seu documento foi processado e já está disponível para visualização e download.
            </p>

            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px;">
              <a href="${result.documentUrl}" target="_blank" class="btn btn-primary" style="padding: 12px 24px; font-size: 1rem;">
                📄 Visualizar / Baixar PDF
              </a>
              <button id="refill-btn" class="btn btn-secondary" style="padding: 12px 20px;">
                🔄 Preencher Novamente
              </button>
            </div>

            <!-- PDF Preview Frame -->
            <div style="border-radius: var(--radius-lg); overflow: hidden; border: 1px solid var(--border-subtle); background: #fff;">
              <iframe src="${result.documentUrl}" style="width: 100%; height: 500px; border: none;"></iframe>
            </div>
          </div>
        `;

        formContainer.querySelector('#refill-btn')?.addEventListener('click', () => {
          renderPublicFormView(container, token);
        });
      } catch (err: any) {
        toast.error(`Erro ao gerar documento: ${err.message}`);
        submitBtn.disabled = false;
        submitBtn.innerHTML = `🚀 Gerar Documento PDF`;
      }
    });
  } catch (err: any) {
    formContainer.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--danger);">
        <div style="font-size: 3rem; margin-bottom: 12px;">⚠️</div>
        <h3 style="margin-bottom: 8px;">Link Indisponível</h3>
        <p style="color: var(--text-secondary); font-size: 0.9rem;">${err.message || 'Este formulário não foi encontrado ou não está mais ativo.'}</p>
      </div>
    `;
  }
}
