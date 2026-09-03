export interface ModalOptions {
  title: string;
  bodyHtml: string;
  confirmText?: string;
  cancelText?: string;
  confirmVariant?: 'primary' | 'danger' | 'success';
  onConfirm?: (modal: HTMLElement) => Promise<boolean | void> | boolean | void;
  onCancel?: () => void;
}

class ModalService {
  private container: HTMLElement | null = null;

  private getContainer(): HTMLElement {
    if (!this.container) {
      this.container = document.getElementById('modal-container');
      if (!this.container) {
        this.container = document.createElement('div');
        this.container.id = 'modal-container';
        document.body.appendChild(this.container);
      }
    }
    return this.container;
  }

  open(options: ModalOptions): { close: () => void } {
    const container = this.getContainer();
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    const confirmVariant = options.confirmVariant || 'primary';
    const confirmBtnClass = `btn btn-${confirmVariant}`;

    overlay.innerHTML = `
      <div class="modal-box">
        <div class="modal-header">
          <h3 style="font-size: 1.15rem; font-weight: 700;">${options.title}</h3>
          <button class="btn-icon close-modal-btn">✕</button>
        </div>
        <div class="modal-body">
          ${options.bodyHtml}
        </div>
        <div class="modal-footer">
          ${options.cancelText !== null && options.cancelText !== '' ? `<button class="btn btn-secondary cancel-btn">${options.cancelText || 'Cancelar'}</button>` : ''}
          ${options.confirmText ? `<button class="${confirmBtnClass} confirm-btn">${options.confirmText}</button>` : ''}
        </div>
      </div>
    `;

    const close = () => {
      overlay.remove();
    };

    overlay.querySelector('.close-modal-btn')?.addEventListener('click', () => {
      close();
      options.onCancel?.();
    });

    overlay.querySelector('.cancel-btn')?.addEventListener('click', () => {
      close();
      options.onCancel?.();
    });

    overlay.querySelector('.confirm-btn')?.addEventListener('click', async (e) => {
      const btn = e.currentTarget as HTMLButtonElement;
      btn.disabled = true;
      btn.innerHTML = `<span class="spinner"></span> Processando...`;
      try {
        const result = await options.onConfirm?.(overlay);
        if (result !== false) {
          close();
        }
      } catch {
        btn.disabled = false;
        btn.innerHTML = options.confirmText || 'Confirmar';
      }
    });

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        close();
        options.onCancel?.();
      }
    });

    container.appendChild(overlay);
    return { close };
  }

  confirm(title: string, message: string, onConfirm: () => Promise<void> | void) {
    this.open({
      title,
      bodyHtml: `<p style="color: var(--text-secondary);">${message}</p>`,
      confirmText: 'Confirmar',
      confirmVariant: 'danger',
      onConfirm,
    });
  }
}

export const modal = new ModalService();
