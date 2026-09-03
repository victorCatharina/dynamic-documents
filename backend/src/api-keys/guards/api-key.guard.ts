import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiKeysService } from '../api-keys.service';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'];
    const xApiKey = request.headers['x-api-key'] as string;

    let apiKey: string | undefined;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      apiKey = authHeader.substring(7).trim();
    } else if (xApiKey) {
      apiKey = xApiKey.trim();
    }

    if (!apiKey) {
      throw new UnauthorizedException({
        code: 'MISSING_API_KEY',
        message:
          'Autenticação necessária. Forneça o token via Authorization: Bearer <API_KEY> ou header x-api-key',
      });
    }

    const keyRecord = await this.apiKeysService.validateKey(apiKey);
    (request as any).apiKey = keyRecord;

    return true;
  }
}
