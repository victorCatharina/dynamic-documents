"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppLoggerService = void 0;
const common_1 = require("@nestjs/common");
let AppLoggerService = class AppLoggerService {
    formatMessage(level, message, context) {
        const timestamp = new Date().toISOString();
        let sanitizedMessage = message;
        if (typeof message === 'object' && message !== null) {
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
    log(message, context) {
        console.log(this.formatMessage('info', message, context));
    }
    error(message, trace, context) {
        console.error(this.formatMessage('error', message, context));
        if (trace) {
            console.error(trace);
        }
    }
    warn(message, context) {
        console.warn(this.formatMessage('warn', message, context));
    }
    debug(message, context) {
        console.debug(this.formatMessage('debug', message, context));
    }
    verbose(message, context) {
        console.log(this.formatMessage('verbose', message, context));
    }
};
exports.AppLoggerService = AppLoggerService;
exports.AppLoggerService = AppLoggerService = __decorate([
    (0, common_1.Injectable)()
], AppLoggerService);
//# sourceMappingURL=app-logger.service.js.map