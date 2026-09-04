import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  private readonly defaultConfig: MatSnackBarConfig = {
    duration: 4000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
  };

  success(message: string, action = 'Fechar'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: ['app-snackbar-success'],
    });
  }

  error(message: string, action = 'Fechar'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration: 6000,
      panelClass: ['app-snackbar-error'],
    });
  }

  warning(message: string, action = 'Fechar'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      duration: 5000,
      panelClass: ['app-snackbar-warning'],
    });
  }

  info(message: string, action = 'Fechar'): void {
    this.snackBar.open(message, action, {
      ...this.defaultConfig,
      panelClass: ['app-snackbar-info'],
    });
  }
}
