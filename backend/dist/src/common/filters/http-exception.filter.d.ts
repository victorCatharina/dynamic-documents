import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export interface StandardErrorResponse {
    statusCode: number;
    code: string;
    message: string;
    errors?: Array<{
        field?: string;
        code?: string;
        message: string;
        details?: any;
    }>;
    timestamp: string;
    path: string;
}
export declare class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: unknown, host: ArgumentsHost): void;
    private getCodeFromStatus;
}
