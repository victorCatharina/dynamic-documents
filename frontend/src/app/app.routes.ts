import { Routes } from '@angular/router';
import { authGuard } from './core/auth/auth.guard';
import { unsavedChangesGuard } from './core/auth/unsaved-changes.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layout/public-layout/public-layout.component';

export const routes: Routes = [
  // Public Login
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },

  // Public Form Layout
  {
    path: 'f',
    component: PublicLayoutComponent,
    children: [
      {
        path: ':publicToken',
        loadComponent: () =>
          import('./features/public-form/pages/public-form/public-form.component').then(
            (m) => m.PublicFormComponent
          ),
      },
    ],
  },

  // Fullscreen Visual Builder (Protected)
  {
    path: 'documents/:documentId/builder',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('./features/document-builder/pages/document-builder/document-builder.component').then(
        (m) => m.DocumentBuilderComponent
      ),
  },
  {
    path: 'documents/:documentId/builder/:versionId',
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () =>
      import('./features/document-builder/pages/document-builder/document-builder.component').then(
        (m) => m.DocumentBuilderComponent
      ),
  },

  // Protected Admin Portal Layout
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'documents',
        pathMatch: 'full',
      },
      {
        path: 'documents',
        loadComponent: () =>
          import('./features/documents/pages/document-list/document-list.component').then(
            (m) => m.DocumentListComponent
          ),
      },
      {
        path: 'documents/:documentId/versions',
        loadComponent: () =>
          import('./features/versions/pages/version-list/version-list.component').then(
            (m) => m.VersionListComponent
          ),
      },
      {
        path: 'documents/:documentId/submissions',
        loadComponent: () =>
          import('./features/submissions/pages/submission-list/submission-list.component').then(
            (m) => m.SubmissionListComponent
          ),
      },
      {
        path: 'custom-fields',
        loadComponent: () =>
          import('./features/custom-fields/pages/custom-field-list/custom-field-list.component').then(
            (m) => m.CustomFieldListComponent
          ),
      },
      {
        path: 'submissions',
        loadComponent: () =>
          import('./features/submissions/pages/submission-list/submission-list.component').then(
            (m) => m.SubmissionListComponent
          ),
      },
      {
        path: 'api-keys',
        loadComponent: () =>
          import('./features/api-keys/pages/api-key-list/api-key-list.component').then(
            (m) => m.ApiKeyListComponent
          ),
      },
    ],
  },

  // Fallback
  {
    path: '**',
    redirectTo: 'documents',
  },
];
