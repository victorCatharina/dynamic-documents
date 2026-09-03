import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import * as crypto from 'crypto';

@Injectable()
export class ApiKeysService {
  private readonly logger = new Logger(ApiKeysService.name);

  constructor(private readonly prisma: PrismaService) {}

  private hashKey(rawKey: string): string {
    return crypto.createHash('sha256').update(rawKey).digest('hex');
  }

  async create(createDto: CreateApiKeyDto) {
    // Generate secure random key: dd_live_...
    const randomSecret = crypto.randomBytes(24).toString('hex');
    const rawApiKey = `dd_live_${randomSecret}`;
    const keyHash = this.hashKey(rawApiKey);
    const keyPrefix = rawApiKey.slice(0, 15);

    const apiKeyRecord = await this.prisma.apiKey.create({
      data: {
        name: createDto.name,
        keyHash,
        keyPrefix,
        expiresAt: createDto.expiresAt ? new Date(createDto.expiresAt) : null,
      },
    });

    this.logger.log(`Created API Key: ${apiKeyRecord.id} (${apiKeyRecord.name})`);

    return {
      id: apiKeyRecord.id,
      name: apiKeyRecord.name,
      keyPrefix: apiKeyRecord.keyPrefix,
      apiKey: rawApiKey, // Returned ONLY once upon creation!
      createdAt: apiKeyRecord.createdAt,
      expiresAt: apiKeyRecord.expiresAt,
    };
  }

  async findAll() {
    return this.prisma.apiKey.findMany({
      select: {
        id: true,
        name: true,
        keyPrefix: true,
        lastUsedAt: true,
        expiresAt: true,
        revokedAt: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async revoke(id: string) {
    const key = await this.prisma.apiKey.findUnique({
      where: { id },
    });

    if (!key) {
      throw new NotFoundException({
        code: 'API_KEY_NOT_FOUND',
        message: 'API Key não encontrada',
      });
    }

    await this.prisma.apiKey.update({
      where: { id },
      data: { revokedAt: new Date() },
    });

    this.logger.log(`Revoked API Key: ${id}`);
  }

  async validateKey(rawKey: string) {
    if (!rawKey) {
      throw new UnauthorizedException({
        code: 'MISSING_API_KEY',
        message: 'API Key não fornecida no cabeçalho Authorization: Bearer <API_KEY>',
      });
    }

    const keyHash = this.hashKey(rawKey);

    const keyRecord = await this.prisma.apiKey.findUnique({
      where: { keyHash },
    });

    if (!keyRecord) {
      this.logger.warn('Failed API Key authentication: invalid key');
      throw new UnauthorizedException({
        code: 'INVALID_API_KEY',
        message: 'API Key inválida',
      });
    }

    if (keyRecord.revokedAt) {
      this.logger.warn(`Failed API Key authentication: revoked key (${keyRecord.id})`);
      throw new UnauthorizedException({
        code: 'API_KEY_REVOKED',
        message: 'API Key foi revogada',
      });
    }

    if (keyRecord.expiresAt && keyRecord.expiresAt < new Date()) {
      this.logger.warn(`Failed API Key authentication: expired key (${keyRecord.id})`);
      throw new UnauthorizedException({
        code: 'API_KEY_EXPIRED',
        message: 'API Key expirada',
      });
    }

    // Update lastUsedAt asynchronously
    this.prisma.apiKey
      .update({
        where: { id: keyRecord.id },
        data: { lastUsedAt: new Date() },
      })
      .catch((err) =>
        this.logger.warn(`Could not update lastUsedAt for key: ${err.message}`),
      );

    return keyRecord;
  }
}
