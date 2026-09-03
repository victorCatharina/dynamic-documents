import { api } from '../services/api';
import { toast } from '../services/toast';

export function renderLoginView(container: HTMLElement) {
  container.innerHTML = `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at top, #1e1b4b 0%, #090d16 100%); padding: 20px;">
      <div class="card" style="width: 100%; max-width: 440px; padding: 40px; border-radius: var(--radius-xl); box-shadow: var(--shadow-lg);">
        <div style="text-align: center; margin-bottom: 32px;">
          <div class="brand-icon" style="margin: 0 auto 16px; width: 54px; height: 54px; font-size: 1.6rem;">D</div>
          <h1 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 8px;">Dynamic Documents</h1>
          <p style="color: var(--text-secondary); font-size: 0.9rem;">
            Acesse o painel administrativo do Document Engine
          </p>
        </div>

        <form id="login-form">
          <div class="form-group">
            <label class="form-label">E-mail de Acesso</label>
            <input
              type="email"
              id="login-email"
              class="form-control"
              placeholder="admin@dynamicdocs.com"
              value="admin@dynamicdocs.com"
              required
            />
          </div>

          <div class="form-group" style="margin-bottom: 24px;">
            <label class="form-label">Senha</label>
            <input
              type="password"
              id="login-password"
              class="form-control"
              placeholder="••••••••"
              value="Admin123!"
              required
            />
          </div>

          <button type="submit" id="login-btn" class="btn btn-primary" style="width: 100%; padding: 12px; font-size: 1rem;">
            Entrar no Sistema
          </button>
        </form>

        <div style="margin-top: 24px; padding: 12px; background: rgba(99, 102, 241, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(99, 102, 241, 0.2); font-size: 0.8rem; color: var(--text-secondary); text-align: center;">
          💡 <strong>Credenciais Padrão:</strong><br />
          admin@dynamicdocs.com / Admin123!
        </div>
      </div>
    </div>
  `;

  const form = container.querySelector('#login-form') as HTMLFormElement;
  const btn = container.querySelector('#login-btn') as HTMLButtonElement;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = (container.querySelector('#login-email') as HTMLInputElement).value;
    const password = (container.querySelector('#login-password') as HTMLInputElement).value;

    btn.disabled = true;
    btn.innerHTML = `<span class="spinner"></span> Autenticando...`;

    try {
      await api.login(email, password);
      toast.success('Login efetuado com sucesso!');
      window.location.hash = '#/documents';
    } catch (err: any) {
      toast.error(err.message || 'Erro ao realizar login');
      btn.disabled = false;
      btn.innerHTML = 'Entrar no Sistema';
    }
  });
}
