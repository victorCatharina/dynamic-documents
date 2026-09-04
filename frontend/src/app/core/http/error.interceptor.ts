import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const notification = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';

      if (error.error) {
        if (typeof error.error.message === 'string') {
          errorMessage = error.error.message;
        } else if (Array.isArray(error.error.message)) {
          errorMessage = error.error.message.join(', ');
        } else if (error.error.errors && Array.isArray(error.error.errors)) {
          errorMessage = error.error.errors
            .map((e: { field?: string; message?: string; code?: string }) => e.message || `${e.field}: ${e.code}`)
            .join(' | ');
        }
      }

      switch (error.status) {
        case 401:
          if (!req.url.includes('/auth/login')) {
            notification.error('Sua sessão expirou. Por favor, faça login novamente.');
            authService.logout();
          } else {
            notification.error('Credenciais inválidas. Verifique seu e-mail e senha.');
          }
          break;

        case 403:
          notification.error('Acesso negado. Você não tem permissão para esta ação.');
          break;

        case 404:
          notification.warning(errorMessage || 'Recurso não encontrado.');
          break;

        case 409:
          notification.error(errorMessage || 'Conflito de dados ou versão imutável.');
          break;

        case 422:
          notification.error(`Validação: ${errorMessage}`);
          break;

        case 500:
          notification.error('Erro interno do servidor. Contate o suporte se o problema persistir.');
          break;

        case 0:
          notification.error('Não foi possível conectar ao servidor. Verifique se o backend está em execução.');
          break;

        default:
          notification.error(errorMessage);
          break;
      }

      return throwError(() => error);
    })
  );
};
