import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ApiKeysService } from '../api-keys.service';
export declare class ApiKeyGuard implements CanActivate {
    private readonly apiKeysService;
    constructor(apiKeysService: ApiKeysService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
