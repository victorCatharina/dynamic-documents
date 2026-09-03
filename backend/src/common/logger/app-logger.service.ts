import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class AppLoggerService implements LoggerService {
  private formatMessage(level: string, message: any, context?: string) {
    const timestamp = new Date().toISOString();
    let sanitizedMessage = message;

    if (typeof message === 'object' && message !== null) {
      // Create a shallow copy and sanitize sensitive keys
      const sanitized = { ...message };
      const sensitiveKeys = ['password', 'passwordHash', 'apiKey', 'token', 'jwt', 'secret'];
      for (const key of sensitiveKeys) {
        if (key in sanitized) {
          sanitized[key] = '[REDACTED]';
        }
      }
      sanitizedMessage = JSON.stringify(sanitized);
    }

    return `[${timestamp}] [${level.toUpperCase()}] [${context || 'Application'}] ${sanitizedMessage}`;
  }

  log(message: any, context?: string) {
    console.log(this.formatMessage('info', message, context));
  }

  error(message: any, trace?: string, context?: string) {
    console.error(this.formatMessage('error', message, context));
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: any, context?: string) {
    console.warn(this.formatMessage('warn', message, context));
  }

  debug(message: any, context?: string) {
    console.debug(this.formatMessage('debug', message, context));
  }

  verbose(message: any, context?: string) {
    console.log(this.formatMessage('verbose', message, context));
  }
}
