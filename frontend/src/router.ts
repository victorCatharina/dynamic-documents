import { api } from './services/api';
import { renderLoginView } from './views/LoginView';
import { renderDocumentsView } from './views/DocumentsView';
import { renderBuilderView } from './views/BuilderView';
import { renderPublicFormView } from './views/PublicFormView';
import { renderCustomFieldsView } from './views/CustomFieldsView';
import { renderSubmissionsView } from './views/SubmissionsView';
import { renderApiKeysView } from './views/ApiKeysView';
import { renderApiPlaygroundView } from './views/ApiPlaygroundView';

export function initRouter() {
  const app = document.getElementById('app');
  if (!app) return;

  const navigate = () => {
    let hash = window.location.hash || '#/documents';

    // Check public form routes
    if (hash.startsWith('#/form/') || hash.startsWith('#/f/')) {
      const token = hash.replace(/^#(?:(?:\/form\/)|(?:\/f\/))/, '').split('?')[0];
      renderPublicFormView(app, token);
      return;
    }

    if (hash === '#/login') {
      renderLoginView(app);
      return;
    }

    // Require Auth for all other routes
    const token = api.getToken();
    if (!token) {
      window.location.hash = '#/login';
      return;
    }

    if (hash.startsWith('#/builder/')) {
      const docId = hash.replace('#/builder/', '').split('?')[0];
      renderBuilderView(app, docId);
      return;
    }

    if (hash === '#/custom-fields') {
      renderCustomFieldsView(app);
      return;
    }

    if (hash === '#/submissions') {
      renderSubmissionsView(app);
      return;
    }

    if (hash === '#/api-keys') {
      renderApiKeysView(app);
      return;
    }

    if (hash === '#/playground') {
      renderApiPlaygroundView(app);
      return;
    }

    // Default: Documents view
    renderDocumentsView(app);
  };

  window.addEventListener('hashchange', navigate);
  navigate();
}
