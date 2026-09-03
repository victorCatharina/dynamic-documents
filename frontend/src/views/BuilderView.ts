import { api } from '../services/api';
import { toast } from '../services/toast';
import { modal } from '../services/modal';

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

export async function renderBuilderView(container: HTMLElement, documentId: string) {
  container.innerHTML = `
    <div style="height: 100vh; display: flex; flex-direction: column; background: var(--bg-dark); overflow: hidden;">
      <!-- Top Builder Bar -->
      <header class="top-bar" style="height: 60px; padding: 0 20px; background: #0c1322; border-bottom: 1px solid var(--border-subtle);">
        <div style="display: flex; align-items: center; gap: 16px;">
          <a href="#/documents" class="btn btn-secondary btn-icon" title="Voltar para a lista">
            ⬅️
          </a>
          <div>
            <div id="builder-doc-name" style="font-weight: 700; color: #fff; font-size: 1.05rem; display: flex; align-items: center; gap: 8px;">
              Carregando...
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; margin-left: 12px; padding-left: 12px; border-left: 1px solid var(--border-subtle);">
            <select id="version-select" class="form-control" style="padding: 4px 10px; font-size: 0.85rem; width: 130px; height: 32px;">
            </select>
            <span id="version-status-badge" class="badge badge-draft">DRAFT</span>
            <button id="add-version-btn" class="btn btn-secondary" style="padding: 4px 10px; font-size: 0.8rem; height: 32px;" title="Criar nova versão a partir desta">
              ➕ Nova Versão
            </button>
          </div>
        </div>

        <div style="display: flex; align-items: center; gap: 10px;">
          <button id="export-json-btn" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.82rem;">
            { } JSON
          </button>
          <button id="preview-btn" class="btn btn-secondary" style="padding: 6px 12px; font-size: 0.82rem;">
            👁️ Preview PDF
          </button>
          <button id="save-draft-btn" class="btn btn-secondary" style="padding: 6px 14px; font-size: 0.85rem;">
            💾 Salvar Rascunho
          </button>
          <button id="publish-btn" class="btn btn-primary" style="padding: 6px 16px; font-size: 0.85rem;">
            🚀 Publicar Versão
          </button>
        </div>
      </header>

      <!-- Main 3-Column Builder Layout -->
      <div class="builder-layout">
        <!-- Left Toolbox -->
        <aside class="builder-toolbox">
          <div>
            <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; letter-spacing: 0.05em;">
              Campos Padrão
            </h4>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <button class="btn btn-secondary add-field-btn" data-type="TEXT" style="justify-content: flex-start; text-align: left; width: 100%;">
                <span>📝</span> <span>Texto</span>
              </button>
              <button class="btn btn-secondary add-field-btn" data-type="NUMBER" style="justify-content: flex-start; text-align: left; width: 100%;">
                <span>🔢</span> <span>Número</span>
              </button>
              <button class="btn btn-secondary add-field-btn" data-type="DATE" style="justify-content: flex-start; text-align: left; width: 100%;">
                <span>📅</span> <span>Data</span>
              </button>
              <button class="btn btn-secondary add-field-btn" data-type="IMAGE" style="justify-content: flex-start; text-align: left; width: 100%;">
                <span>🖼️</span> <span>Imagem</span>
              </button>
            </div>
          </div>

          <div>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-muted); letter-spacing: 0.05em;">
                Campos Customizados
              </h4>
              <a href="#/custom-fields" target="_blank" style="font-size: 0.75rem;">+ Criar</a>
            </div>
            <div id="custom-fields-toolbox" style="display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 10px;">
                Carregando catálogo...
              </div>
            </div>
          </div>

          <div style="margin-top: auto; padding-top: 16px; border-top: 1px solid var(--border-subtle);">
            <h4 style="font-size: 0.82rem; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">
              Plano de Fundo da Página
            </h4>
            <input type="file" id="bg-upload-input" accept="image/png,image/jpeg,application/pdf" style="display: none;" />
            <button id="upload-bg-btn" class="btn btn-secondary" style="width: 100%; font-size: 0.82rem;">
              🖼️ Carregar Imagem/PDF
            </button>
            <button id="remove-bg-btn" class="btn-icon" style="width: 100%; margin-top: 6px; font-size: 0.78rem; color: var(--danger); display: none;">
              Remover background
            </button>
          </div>
        </aside>

        <!-- Center Canvas Area -->
        <main class="builder-canvas-area" id="canvas-scroll-container">
          <!-- Canvas Toolbar Controls -->
          <div class="canvas-toolbar">
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 0.82rem; color: var(--text-secondary);">Formato:</span>
              <select id="page-size-select" class="form-control" style="padding: 2px 8px; width: 90px; font-size: 0.8rem; height: 28px;">
                <option value="A4">A4</option>
                <option value="A5">A5</option>
                <option value="LETTER">Letter</option>
                <option value="LEGAL">Legal</option>
              </select>
            </div>

            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="font-size: 0.82rem; color: var(--text-secondary);">Orientação:</span>
              <select id="page-orientation-select" class="form-control" style="padding: 2px 8px; width: 110px; font-size: 0.8rem; height: 28px;">
                <option value="PORTRAIT">Retrato</option>
                <option value="LANDSCAPE">Paisagem</option>
              </select>
            </div>

            <div style="display: flex; align-items: center; gap: 6px; margin-left: 8px;">
              <span style="font-size: 0.82rem; color: var(--text-secondary);">Página:</span>
              <button id="prev-page-btn" class="btn-icon" style="padding: 2px 8px;">◀</button>
              <span id="page-counter-label" style="font-size: 0.82rem; font-weight: 600; min-width: 40px; text-align: center;">1 / 1</span>
              <button id="next-page-btn" class="btn-icon" style="padding: 2px 8px;">▶</button>
              <button id="add-page-btn" class="btn btn-secondary" style="padding: 2px 8px; font-size: 0.75rem; height: 28px;">+ Página</button>
            </div>

            <div style="display: flex; align-items: center; gap: 6px; margin-left: auto;">
              <span style="font-size: 0.82rem; color: var(--text-secondary);">Zoom:</span>
              <select id="zoom-select" class="form-control" style="padding: 2px 8px; width: 80px; font-size: 0.8rem; height: 28px;">
                <option value="0.75">75%</option>
                <option value="1.0" selected>100%</option>
                <option value="1.25">125%</option>
              </select>
            </div>
          </div>

          <!-- Canvas Page Sheet Container -->
          <div id="canvas-sheet-wrapper" style="transform-origin: top center; transition: transform 0.15s ease;">
            <div id="canvas-sheet" class="canvas-sheet" style="width: 595px; height: 842px;">
              <div class="canvas-grid-overlay"></div>
              <div id="fields-container" style="position: absolute; inset: 0;"></div>
            </div>
          </div>
        </main>

        <!-- Right Property Inspector -->
        <aside class="builder-inspector" id="builder-inspector">
          <div style="text-align: center; color: var(--text-muted); padding: 40px 10px;">
            <span style="font-size: 2rem;">🖱️</span>
            <p style="font-size: 0.85rem; margin-top: 8px;">
              Selecione um campo no documento para editar suas propriedades, validações e estilo.
            </p>
          </div>
        </aside>
      </div>
    </div>
  `;

  // State
  let currentDoc: any = null;
  let currentVersion: any = null;
  let activePageNumber = 1;
  let selectedFieldId: string | null = null;
  let customFieldsList: any[] = [];
  let isDragging = false;
  let isResizing = false;
  let dragOffset = { x: 0, y: 0 };
  let initialResize = { width: 0, height: 0, mouseX: 0, mouseY: 0 };

  // DOM Elements
  const docNameEl = container.querySelector('#builder-doc-name') as HTMLElement;
  const versionSelect = container.querySelector('#version-select') as HTMLSelectElement;
  const versionStatusBadge = container.querySelector('#version-status-badge') as HTMLElement;
  const canvasSheet = container.querySelector('#canvas-sheet') as HTMLElement;
  const canvasSheetWrapper = container.querySelector('#canvas-sheet-wrapper') as HTMLElement;
  const fieldsContainer = container.querySelector('#fields-container') as HTMLElement;
  const inspector = container.querySelector('#builder-inspector') as HTMLElement;
  const customFieldsToolbox = container.querySelector('#custom-fields-toolbox') as HTMLElement;
  const pageSizeSelect = container.querySelector('#page-size-select') as HTMLSelectElement;
  const pageOrientationSelect = container.querySelector('#page-orientation-select') as HTMLSelectElement;
  const pageCounterLabel = container.querySelector('#page-counter-label') as HTMLElement;
  const zoomSelect = container.querySelector('#zoom-select') as HTMLSelectElement;
  const saveDraftBtn = container.querySelector('#save-draft-btn') as HTMLButtonElement;
  const publishBtn = container.querySelector('#publish-btn') as HTMLButtonElement;
  const removeBgBtn = container.querySelector('#remove-bg-btn') as HTMLButtonElement;

  // Load Document & Custom Fields
  const loadInitialData = async () => {
    try {
      [currentDoc, customFieldsList] = await Promise.all([
        api.getDocument(documentId),
        api.getCustomFields(),
      ]);

      docNameEl.innerHTML = `<span>${currentDoc.name}</span>`;
      renderCustomFieldsToolbox();

      const versions = currentDoc.versions || [];
      versionSelect.innerHTML = versions
        .map(
          (v: any) => `
          <option value="${v.id}">v${v.versionNumber} (${v.status})</option>
        `,
        )
        .join('');

      if (versions.length > 0) {
        currentVersion = versions[0];
        versionSelect.value = currentVersion.id;
        loadVersion(currentVersion.id);
      }
    } catch (err: any) {
      toast.error(`Erro ao carregar documento: ${err.message}`);
    }
  };

  const loadVersion = async (versionId: string) => {
    try {
      currentVersion = await api.getVersion(documentId, versionId);
      updateVersionUI();
      renderCanvas();
      renderInspector();
    } catch (err: any) {
      toast.error(`Erro ao carregar versão: ${err.message}`);
    }
  };

  const updateVersionUI = () => {
    if (!currentVersion) return;
    versionStatusBadge.className = `badge badge-${currentVersion.status.toLowerCase()}`;
    versionStatusBadge.innerText = currentVersion.status;

    const isPublished = currentVersion.status === 'PUBLISHED';
    const isArchived = currentVersion.status === 'ARCHIVED';
    const isReadOnly = isPublished || isArchived;

    saveDraftBtn.disabled = isReadOnly;
    publishBtn.disabled = isReadOnly;
    if (isReadOnly) {
      saveDraftBtn.title = 'Versão publicada é imutável';
      publishBtn.title = 'Versão já publicada';
    } else {
      saveDraftBtn.title = 'Salvar rascunho';
      publishBtn.title = 'Publicar versão';
    }
  };

  const renderCustomFieldsToolbox = () => {
    if (!customFieldsList || customFieldsList.length === 0) {
      customFieldsToolbox.innerHTML = `
        <div style="font-size: 0.8rem; color: var(--text-muted); text-align: center; padding: 10px;">
          Nenhum campo personalizado cadastrado.
        </div>
      `;
      return;
    }

    customFieldsToolbox.innerHTML = customFieldsList
      .map(
        (field) => `
        <button class="btn btn-secondary add-custom-field-btn" data-key="${field.key}" style="justify-content: space-between; text-align: left; width: 100%; padding: 6px 10px; font-size: 0.82rem;">
          <span style="font-weight: 600; color: #fff;">${field.label}</span>
          <span class="badge ${field.inputMode === 'INTEGRATION' ? 'badge-integration' : 'badge-manual'}" style="font-size: 0.65rem; padding: 1px 4px;">
            ${field.inputMode}
          </span>
        </button>
      `,
      )
      .join('');

    customFieldsToolbox.querySelectorAll('.add-custom-field-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const key = (e.currentTarget as HTMLElement).dataset.key!;
        const customDef = customFieldsList.find((f) => f.key === key);
        if (customDef) {
          addFieldToCanvas({
            key: customDef.key,
            label: customDef.label,
            type: customDef.type,
            inputMode: customDef.inputMode,
            validation: customDef.validation || {},
            mask: customDef.formatting?.mask,
          });
        }
      });
    });
  };

  const getActivePage = () => {
    if (!currentVersion?.template?.pages) return null;
    return currentVersion.template.pages.find((p: any) => p.number === activePageNumber) || currentVersion.template.pages[0];
  };

  const renderCanvas = () => {
    const template = currentVersion?.template;
    if (!template) return;

    // Update Dimensions
    const size = template.page?.size || 'A4';
    const orientation = template.page?.orientation || 'PORTRAIT';
    pageSizeSelect.value = size;
    pageOrientationSelect.value = orientation;

    let width = 595;
    let height = 842;
    if (size === 'A5') { width = 420; height = 595; }
    if (size === 'LETTER') { width = 612; height = 792; }
    if (size === 'LEGAL') { width = 612; height = 1008; }

    if (orientation === 'LANDSCAPE') {
      const temp = width;
      width = height;
      height = temp;
    }

    canvasSheet.style.width = `${width}px`;
    canvasSheet.style.height = `${height}px`;

    // Multi-page counter
    const totalPages = template.pages?.length || 1;
    pageCounterLabel.innerText = `${activePageNumber} / ${totalPages}`;

    const activePage = getActivePage();
    if (!activePage) return;

    // Background image
    if (activePage.background?.url) {
      canvasSheet.style.backgroundImage = `url(${activePage.background.url})`;
      removeBgBtn.style.display = 'block';
    } else {
      canvasSheet.style.backgroundImage = 'none';
      removeBgBtn.style.display = 'none';
    }

    // Render Draggable Fields
    fieldsContainer.innerHTML = '';
    const fields = activePage.fields || [];

    fields.forEach((field: any) => {
      const fieldEl = document.createElement('div');
      fieldEl.id = `field-dom-${field.id}`;
      fieldEl.className = `draggable-field ${selectedFieldId === field.id ? 'selected' : ''}`;
      fieldEl.style.left = `${field.position.x}px`;
      fieldEl.style.top = `${field.position.y}px`;
      fieldEl.style.width = `${field.position.width}px`;
      fieldEl.style.height = `${field.position.height}px`;

      // Apply Typography Styles
      if (field.style?.fontSize) fieldEl.style.fontSize = `${field.style.fontSize}px`;
      if (field.style?.color) fieldEl.style.color = field.style.color;
      if (field.style?.bold) fieldEl.style.fontWeight = '700';
      if (field.style?.italic) fieldEl.style.fontStyle = 'italic';
      if (field.style?.alignment) fieldEl.style.justifyContent = field.style.alignment === 'CENTER' ? 'center' : field.style.alignment === 'RIGHT' ? 'flex-end' : 'flex-start';

      const modeBadge = field.inputMode === 'INTEGRATION' ? '⚡' : '✍️';
      const labelText = field.label || field.key;

      fieldEl.innerHTML = `
        <span style="font-size: 0.72rem; opacity: 0.7; margin-right: 4px;">${modeBadge}</span>
        <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: 500;">
          ${labelText}
        </span>
        <div class="resize-handle" data-field-id="${field.id}"></div>
      `;

      // Click to select
      fieldEl.addEventListener('mousedown', (e) => {
        if ((e.target as HTMLElement).classList.contains('resize-handle')) return;
        e.stopPropagation();
        selectedFieldId = field.id;
        renderCanvas();
        renderInspector();

        // Init Drag
        isDragging = true;
        const rect = fieldEl.getBoundingClientRect();
        const zoom = parseFloat(zoomSelect.value) || 1.0;
        dragOffset = {
          x: (e.clientX - rect.left) / zoom,
          y: (e.clientY - rect.top) / zoom,
        };
      });

      // Resize Handle
      const resizeHandle = fieldEl.querySelector('.resize-handle') as HTMLElement;
      resizeHandle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        selectedFieldId = field.id;
        isResizing = true;
        initialResize = {
          width: field.position.width,
          height: field.position.height,
          mouseX: e.clientX,
          mouseY: e.clientY,
        };
      });

      fieldsContainer.appendChild(fieldEl);
    });
  };

  // Canvas Mouse Move & Up for Drag / Resize
  window.addEventListener('mousemove', (e) => {
    if (!isDragging && !isResizing) return;
    const activePage = getActivePage();
    if (!activePage || !selectedFieldId) return;
    const field = activePage.fields.find((f: any) => f.id === selectedFieldId);
    if (!field) return;

    const zoom = parseFloat(zoomSelect.value) || 1.0;

    if (isDragging) {
      const sheetRect = canvasSheet.getBoundingClientRect();
      let newX = Math.round((e.clientX - sheetRect.left) / zoom - dragOffset.x);
      let newY = Math.round((e.clientY - sheetRect.top) / zoom - dragOffset.y);

      // Snap to grid (10px)
      newX = Math.max(0, Math.round(newX / 5) * 5);
      newY = Math.max(0, Math.round(newY / 5) * 5);

      field.position.x = newX;
      field.position.y = newY;

      const dom = document.getElementById(`field-dom-${field.id}`);
      if (dom) {
        dom.style.left = `${newX}px`;
        dom.style.top = `${newY}px`;
      }
      updateInspectorCoordinates(newX, newY, field.position.width, field.position.height);
    } else if (isResizing) {
      const deltaX = (e.clientX - initialResize.mouseX) / zoom;
      const deltaY = (e.clientY - initialResize.mouseY) / zoom;

      const newW = Math.max(40, Math.round(initialResize.width + deltaX));
      const newH = Math.max(20, Math.round(initialResize.height + deltaY));

      field.position.width = newW;
      field.position.height = newH;

      const dom = document.getElementById(`field-dom-${field.id}`);
      if (dom) {
        dom.style.width = `${newW}px`;
        dom.style.height = `${newH}px`;
      }
      updateInspectorCoordinates(field.position.x, field.position.y, newW, newH);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isDragging || isResizing) {
      isDragging = false;
      isResizing = false;
    }
  });

  // Deselect on canvas background click
  canvasSheet.addEventListener('mousedown', (e) => {
    if (e.target === canvasSheet || (e.target as HTMLElement).classList.contains('canvas-grid-overlay')) {
      selectedFieldId = null;
      renderCanvas();
      renderInspector();
    }
  });

  const addFieldToCanvas = (overrides: Partial<any> = {}) => {
    const activePage = getActivePage();
    if (!activePage) return;

    if (!Array.isArray(activePage.fields)) {
      activePage.fields = [];
    }

    const fieldCount = activePage.fields.length + 1;
    const type = overrides.type || 'TEXT';
    const defaultKey = overrides.key || `campo_${type.toLowerCase()}_${fieldCount}`;

    const newField = {
      id: `field_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      key: defaultKey,
      label: overrides.label || `Novo Campo ${fieldCount}`,
      type,
      inputMode: overrides.inputMode || 'MANUAL',
      position: {
        x: 60,
        y: 60 + (activePage.fields.length * 40) % 500,
        width: type === 'IMAGE' ? 140 : 220,
        height: type === 'IMAGE' ? 100 : 32,
      },
      style: {
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#000000',
        bold: false,
        italic: false,
        alignment: 'LEFT',
      },
      validation: overrides.validation || { required: false },
      mask: overrides.mask || '',
    };

    activePage.fields.push(newField);
    selectedFieldId = newField.id;
    renderCanvas();
    renderInspector();
    toast.success(`Campo '${newField.label}' adicionado à página.`);
  };

  const updateInspectorCoordinates = (x: number, y: number, w: number, h: number) => {
    const xInput = inspector.querySelector('#prop-pos-x') as HTMLInputElement;
    const yInput = inspector.querySelector('#prop-pos-y') as HTMLInputElement;
    const wInput = inspector.querySelector('#prop-pos-w') as HTMLInputElement;
    const hInput = inspector.querySelector('#prop-pos-h') as HTMLInputElement;
    if (xInput) xInput.value = String(x);
    if (yInput) yInput.value = String(y);
    if (wInput) wInput.value = String(w);
    if (hInput) hInput.value = String(h);
  };

  const renderInspector = () => {
    const activePage = getActivePage();
    if (!activePage || !selectedFieldId) {
      inspector.innerHTML = `
        <div style="text-align: center; color: var(--text-muted); padding: 40px 10px;">
          <span style="font-size: 2.2rem;">🖱️</span>
          <p style="font-size: 0.88rem; margin-top: 10px; line-height: 1.4;">
            Clique em um campo na folha para editar suas configurações, estilo e validações.
          </p>
        </div>
      `;
      return;
    }

    const field = activePage.fields.find((f: any) => f.id === selectedFieldId);
    if (!field) return;

    inspector.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
        <h3 style="font-size: 0.95rem; font-weight: 700;">Propriedades do Campo</h3>
        <button id="delete-field-btn" class="btn btn-danger" style="padding: 4px 8px; font-size: 0.75rem;">
          🗑️ Remover
        </button>
      </div>

      <!-- Basic Info -->
      <div class="form-group">
        <label class="form-label">Identificador Único (Key) *</label>
        <input type="text" id="prop-key" class="form-control" value="${field.key}" />
      </div>

      <div class="form-group">
        <label class="form-label">Rótulo / Label</label>
        <input type="text" id="prop-label" class="form-control" value="${field.label || ''}" />
      </div>

      <div class="form-group">
        <label class="form-label">Modo de Entrada</label>
        <select id="prop-input-mode" class="form-control">
          <option value="MANUAL" ${field.inputMode === 'MANUAL' ? 'selected' : ''}>✍️ MANUAL (Formulário Público)</option>
          <option value="INTEGRATION" ${field.inputMode === 'INTEGRATION' ? 'selected' : ''}>⚡ INTEGRATION (Exclusivo API)</option>
        </select>
      </div>

      <!-- Position -->
      <div>
        <label class="form-label" style="margin-bottom: 6px; display: block;">Posição & Dimensão (pt)</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
          <div><span style="font-size: 0.7rem; color: var(--text-muted);">X:</span> <input type="number" id="prop-pos-x" class="form-control" value="${field.position.x}" /></div>
          <div><span style="font-size: 0.7rem; color: var(--text-muted);">Y:</span> <input type="number" id="prop-pos-y" class="form-control" value="${field.position.y}" /></div>
          <div><span style="font-size: 0.7rem; color: var(--text-muted);">Largura:</span> <input type="number" id="prop-pos-w" class="form-control" value="${field.position.width}" /></div>
          <div><span style="font-size: 0.7rem; color: var(--text-muted);">Altura:</span> <input type="number" id="prop-pos-h" class="form-control" value="${field.position.height}" /></div>
        </div>
      </div>

      <!-- Typography & Styling -->
      <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 6px;">
        <label class="form-label" style="margin-bottom: 8px; display: block;">Tipografia & Estilo</label>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 8px;">
          <div>
            <select id="prop-font-family" class="form-control">
              <option value="Helvetica" ${field.style?.fontFamily === 'Helvetica' ? 'selected' : ''}>Helvetica</option>
              <option value="Times" ${field.style?.fontFamily === 'Times' ? 'selected' : ''}>Times Roman</option>
              <option value="Courier" ${field.style?.fontFamily === 'Courier' ? 'selected' : ''}>Courier</option>
            </select>
          </div>
          <div>
            <input type="number" id="prop-font-size" class="form-control" placeholder="Tamanho" value="${field.style?.fontSize || 12}" />
          </div>
        </div>

        <div style="display: flex; gap: 8px; align-items: center; margin-bottom: 8px;">
          <input type="color" id="prop-font-color" value="${field.style?.color || '#000000'}" style="width: 38px; height: 34px; padding: 0; background: transparent; border: 1px solid var(--border-subtle); border-radius: 4px; cursor: pointer;" />
          <button id="prop-style-bold" class="btn btn-secondary ${field.style?.bold ? 'btn-primary' : ''}" style="padding: 6px 12px; font-weight: 800;">B</button>
          <button id="prop-style-italic" class="btn btn-secondary ${field.style?.italic ? 'btn-primary' : ''}" style="padding: 6px 12px; font-style: italic;">I</button>
          <select id="prop-style-align" class="form-control" style="flex: 1;">
            <option value="LEFT" ${field.style?.alignment === 'LEFT' ? 'selected' : ''}>Esquerda</option>
            <option value="CENTER" ${field.style?.alignment === 'CENTER' ? 'selected' : ''}>Centro</option>
            <option value="RIGHT" ${field.style?.alignment === 'RIGHT' ? 'selected' : ''}>Direita</option>
          </select>
        </div>
      </div>

      <!-- Mask & Validation -->
      <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 6px;">
        <label class="form-label" style="margin-bottom: 8px; display: block;">Validação & Máscaras</label>
        
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 10px;">
          <input type="checkbox" id="prop-val-required" ${field.validation?.required ? 'checked' : ''} style="width: 16px; height: 16px; cursor: pointer;" />
          <label for="prop-val-required" style="font-size: 0.85rem; cursor: pointer; color: #fff;">Campo Obrigatório</label>
        </div>

        <div class="form-group" style="margin-bottom: 8px;">
          <label class="form-label">Máscara Pré-definida</label>
          <select id="prop-mask-select" class="form-control">
            <option value="" ${!field.mask ? 'selected' : ''}>Nenhuma</option>
            <option value="CPF" ${field.mask === 'CPF' ? 'selected' : ''}>CPF (000.000.000-00)</option>
            <option value="CNPJ" ${field.mask === 'CNPJ' ? 'selected' : ''}>CNPJ (00.000.000/0000-00)</option>
            <option value="CEP" ${field.mask === 'CEP' ? 'selected' : ''}>CEP (00000-000)</option>
            <option value="PHONE" ${field.mask === 'PHONE' ? 'selected' : ''}>Telefone ((00) 00000-0000)</option>
          </select>
        </div>
      </div>
    `;

    // Attach Inspector Handlers
    const bindInput = (id: string, propPath: string, isNumeric: boolean = false) => {
      const el = inspector.querySelector(`#${id}`) as HTMLInputElement;
      if (!el) return;
      el.addEventListener('input', () => {
        const val = isNumeric ? parseFloat(el.value) || 0 : el.value;
        const keys = propPath.split('.');
        let target: any = field;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!target[keys[i]]) target[keys[i]] = {};
          target = target[keys[i]];
        }
        target[keys[keys.length - 1]] = val;
        renderCanvas();
      });
    };

    bindInput('prop-key', 'key');
    bindInput('prop-label', 'label');
    bindInput('prop-pos-x', 'position.x', true);
    bindInput('prop-pos-y', 'position.y', true);
    bindInput('prop-pos-w', 'position.width', true);
    bindInput('prop-pos-h', 'position.height', true);
    bindInput('prop-font-size', 'style.fontSize', true);
    bindInput('prop-font-color', 'style.color');

    inspector.querySelector('#prop-input-mode')?.addEventListener('change', (e) => {
      field.inputMode = (e.target as HTMLSelectElement).value;
      renderCanvas();
    });

    inspector.querySelector('#prop-font-family')?.addEventListener('change', (e) => {
      if (!field.style) field.style = {};
      field.style.fontFamily = (e.target as HTMLSelectElement).value;
      renderCanvas();
    });

    inspector.querySelector('#prop-style-align')?.addEventListener('change', (e) => {
      if (!field.style) field.style = {};
      field.style.alignment = (e.target as HTMLSelectElement).value;
      renderCanvas();
    });

    inspector.querySelector('#prop-style-bold')?.addEventListener('click', () => {
      if (!field.style) field.style = {};
      field.style.bold = !field.style.bold;
      renderCanvas();
      renderInspector();
    });

    inspector.querySelector('#prop-style-italic')?.addEventListener('click', () => {
      if (!field.style) field.style = {};
      field.style.italic = !field.style.italic;
      renderCanvas();
      renderInspector();
    });

    inspector.querySelector('#prop-val-required')?.addEventListener('change', (e) => {
      if (!field.validation) field.validation = {};
      field.validation.required = (e.target as HTMLInputElement).checked;
    });

    inspector.querySelector('#prop-mask-select')?.addEventListener('change', (e) => {
      field.mask = (e.target as HTMLSelectElement).value;
    });

    inspector.querySelector('#delete-field-btn')?.addEventListener('click', () => {
      activePage.fields = activePage.fields.filter((f: any) => f.id !== field.id);
      selectedFieldId = null;
      renderCanvas();
      renderInspector();
      toast.info('Campo removido.');
    });
  };

  // Top Bar Actions
  saveDraftBtn.addEventListener('click', async () => {
    if (!currentVersion) return;
    saveDraftBtn.disabled = true;
    saveDraftBtn.innerHTML = 'Salvando...';
    try {
      await api.updateVersion(documentId, currentVersion.id, currentVersion.template);
      toast.success('Rascunho salvo com sucesso!');
    } catch (err: any) {
      toast.error(`Erro ao salvar: ${err.message}`);
    } finally {
      saveDraftBtn.disabled = false;
      saveDraftBtn.innerHTML = '💾 Salvar Rascunho';
    }
  });

  publishBtn.addEventListener('click', () => {
    if (!currentVersion) return;

    modal.open({
      title: 'Publicar Versão do Documento',
      bodyHtml: `
        <p style="color: var(--text-secondary); margin-bottom: 12px;">
          Ao publicar a <strong>v${currentVersion.versionNumber}</strong>:
        </p>
        <ul style="color: var(--text-secondary); font-size: 0.9rem; margin-left: 20px; margin-bottom: 16px; line-height: 1.6;">
          <li>Esta versão se tornará <strong>estritamente imutável</strong>.</li>
          <li>Ela será a versão ativa para novos preenchimentos no formulário público e integrações via API.</li>
          <li>Versões publicadas anteriormente serão arquivadas automaticamente.</li>
        </ul>
      `,
      confirmText: 'Confirmar Publicação',
      confirmVariant: 'success',
      onConfirm: async () => {
        try {
          // Save draft first
          await api.updateVersion(documentId, currentVersion.id, currentVersion.template);
          const published = await api.publishVersion(documentId, currentVersion.id);
          toast.success(`Versão v${published.versionNumber} publicada com sucesso!`);
          await loadVersion(published.id);
        } catch (err: any) {
          toast.error(`Erro ao publicar: ${err.message}`);
          return false;
        }
      },
    });
  });

  container.querySelector('#add-version-btn')?.addEventListener('click', async () => {
    modal.open({
      title: 'Criar Nova Versão',
      bodyHtml: `
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 16px;">
          Deseja criar uma nova versão clonando o template da versão atual (v${currentVersion?.versionNumber || 1})?
        </p>
      `,
      confirmText: 'Criar Nova Versão',
      onConfirm: async () => {
        try {
          const newVer = await api.createVersion(documentId, {
            sourceVersionId: currentVersion?.id,
          });
          toast.success(`Versão v${newVer.versionNumber} criada.`);
          await loadInitialData();
          versionSelect.value = newVer.id;
          await loadVersion(newVer.id);
        } catch (err: any) {
          toast.error(`Erro ao criar versão: ${err.message}`);
          return false;
        }
      },
    });
  });

  versionSelect.addEventListener('change', () => {
    loadVersion(versionSelect.value);
  });

  // Toolbox Add Standard Field
  container.querySelectorAll('.add-field-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const type = (e.currentTarget as HTMLElement).dataset.type;
      addFieldToCanvas({ type });
    });
  });

  // Page Format & Zoom
  pageSizeSelect.addEventListener('change', () => {
    if (!currentVersion?.template?.page) currentVersion.template.page = {};
    currentVersion.template.page.size = pageSizeSelect.value;
    renderCanvas();
  });

  pageOrientationSelect.addEventListener('change', () => {
    if (!currentVersion?.template?.page) currentVersion.template.page = {};
    currentVersion.template.page.orientation = pageOrientationSelect.value;
    renderCanvas();
  });

  zoomSelect.addEventListener('change', () => {
    const zoom = zoomSelect.value;
    canvasSheetWrapper.style.transform = `scale(${zoom})`;
  });

  // Multi-page Pagination
  container.querySelector('#prev-page-btn')?.addEventListener('click', () => {
    if (activePageNumber > 1) {
      activePageNumber--;
      selectedFieldId = null;
      renderCanvas();
      renderInspector();
    }
  });

  container.querySelector('#next-page-btn')?.addEventListener('click', () => {
    const total = currentVersion?.template?.pages?.length || 1;
    if (activePageNumber < total) {
      activePageNumber++;
      selectedFieldId = null;
      renderCanvas();
      renderInspector();
    }
  });

  container.querySelector('#add-page-btn')?.addEventListener('click', () => {
    if (!currentVersion?.template) return;
    if (!Array.isArray(currentVersion.template.pages)) currentVersion.template.pages = [];
    const newPageNum = currentVersion.template.pages.length + 1;
    currentVersion.template.pages.push({
      number: newPageNum,
      fields: [],
    });
    activePageNumber = newPageNum;
    selectedFieldId = null;
    renderCanvas();
    renderInspector();
    toast.success(`Página ${newPageNum} adicionada.`);
  });

  // Export JSON
  container.querySelector('#export-json-btn')?.addEventListener('click', () => {
    if (!currentVersion?.template) return;
    modal.open({
      title: 'Template JSON do Documento',
      bodyHtml: `
        <pre style="background: var(--bg-dark); padding: 14px; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 0.8rem; color: #a5b4fc; max-height: 420px; overflow: auto;">${JSON.stringify(currentVersion.template, null, 2)}</pre>
      `,
      cancelText: 'Fechar',
      confirmText: 'Copiar JSON',
      onConfirm: () => {
        navigator.clipboard.writeText(JSON.stringify(currentVersion.template, null, 2));
        toast.success('Template JSON copiado para a área de transferência!');
      },
    });
  });

  // Preview PDF
  container.querySelector('#preview-btn')?.addEventListener('click', async () => {
    if (!currentVersion) return;
    try {
      toast.info('Gerando preview do documento...');
      // Render test submission
      const sub = await api.createDocumentSubmission(documentId, {});
      window.open(sub.documentUrl, '_blank');
    } catch {
      // If direct submission fails because required fields, generate dummy preview data
      try {
        const dummyData: Record<string, any> = {};
        currentVersion.template?.pages?.forEach((p: any) => {
          p.fields?.forEach((f: any) => {
            dummyData[f.key] = f.type === 'DATE' ? '2026-09-02' : f.type === 'NUMBER' ? 1234 : 'Valor de Teste';
          });
        });
        const sub = await api.createDocumentSubmission(documentId, dummyData);
        window.open(sub.documentUrl, '_blank');
      } catch (err: any) {
        toast.error(`Erro ao gerar preview: ${err.message}`);
      }
    }
  });

  // Background Upload
  const bgInput = container.querySelector('#bg-upload-input') as HTMLInputElement;
  container.querySelector('#upload-bg-btn')?.addEventListener('click', () => {
    bgInput.click();
  });

  bgInput.addEventListener('change', async () => {
    const file = bgInput.files?.[0];
    if (!file) return;
    try {
      toast.info('Fazendo upload do background...');
      let res: any;
      if (file.name.endsWith('.pdf')) {
        res = await api.importPdf(documentId, file);
      } else {
        res = await api.importDocx(documentId, file);
      }
      toast.success('Background carregado com sucesso!');
      await loadInitialData();
    } catch (err: any) {
      toast.error(`Erro no upload: ${err.message}`);
    }
  });

  removeBgBtn.addEventListener('click', () => {
    const activePage = getActivePage();
    if (activePage) {
      activePage.background = undefined;
      renderCanvas();
      toast.info('Background removido da página atual.');
    }
  });

  // Load initial data
  loadInitialData();
}
