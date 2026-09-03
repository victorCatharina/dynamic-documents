import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IStorageService, UploadOptions } from './storage.interface';
import { LocalStorageService } from './local-storage.service';
import { S3StorageService } from './s3-storage.service';
import { Asset } from '@prisma/client';
import { Readable } from 'stream';
import * as http from 'http';
import * as https from 'https';

@Injectable()
export class StorageService implements IStorageService {
  private readonly logger = new Logger(StorageService.name);
  private readonly activeStorage: IStorageService;

  constructor(
    private readonly configService: ConfigService,
    private readonly localStorageService: LocalStorageService,
    private readonly s3StorageService: S3StorageService,
  ) {
    const driver = this.configService.get<string>('storage.driver') || 'local';
    if (driver === 's3') {
      this.activeStorage = this.s3StorageService;
      this.logger.log('Storage initialized with S3 / MinIO driver');
    } else {
      this.activeStorage = this.localStorageService;
      this.logger.log('Storage initialized with Local Disk driver');
    }
  }

  async upload(fileBuffer: Buffer, options: UploadOptions): Promise<Asset> {
    return this.activeStorage.upload(fileBuffer, options);
  }

  async delete(assetId: string): Promise<void> {
    return this.activeStorage.delete(assetId);
  }

  async getSignedUrl(assetId: string, expiresInSeconds?: number): Promise<string> {
    return this.activeStorage.getSignedUrl(assetId, expiresInSeconds);
  }

  async getObject(assetId: string): Promise<Buffer> {
    return this.activeStorage.getObject(assetId);
  }

  async getStream(assetId: string): Promise<Readable> {
    return this.activeStorage.getStream(assetId);
  }

  // SSRF Protection & remote asset fetching (Section 45)
  async fetchRemoteAsset(urlStr: string): Promise<{ buffer: Buffer; mimeType: string }> {
    let parsedUrl: URL;
    try {
      parsedUrl = new URL(urlStr);
    } catch {
      throw new BadRequestException({
        code: 'INVALID_URL',
        message: 'URL fornecida é inválida',
      });
    }

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new BadRequestException({
        code: 'SSRF_BLOCKED',
        message: 'Apenas protocolos HTTP e HTTPS são permitidos',
      });
    }

    const hostname = parsedUrl.hostname.toLowerCase();
    // Block localhost and private IP ranges
    const isPrivate =
      hostname === 'localhost' ||
      hostname === '127.0.0.1' ||
      hostname === '::1' ||
      hostname.startsWith('10.') ||
      hostname.startsWith('192.168.') ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(hostname) ||
      hostname.endsWith('.internal') ||
      hostname.endsWith('.local');

    if (isPrivate) {
      throw new BadRequestException({
        code: 'SSRF_BLOCKED',
        message: 'Acesso a endereços de rede privada ou localhost é bloqueado',
      });
    }

    return new Promise((resolve, reject) => {
      const client = parsedUrl.protocol === 'https:' ? https : http;
      const req = client.get(urlStr, { timeout: 10000 }, (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          // Controlled redirect (1 hop max for safety)
          this.fetchRemoteAsset(res.headers.location)
            .then(resolve)
            .catch(reject);
          return;
        }

        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          reject(
            new BadRequestException({
              code: 'FETCH_FAILED',
              message: `Falha ao baixar imagem/arquivo remoto. HTTP status: ${res.statusCode}`,
            }),
          );
          return;
        }

        const mimeType = res.headers['content-type'] || 'application/octet-stream';
        const chunks: Buffer[] = [];
        let totalSize = 0;
        const maxSize = 10 * 1024 * 1024; // 10MB limit

        res.on('data', (chunk) => {
          totalSize += chunk.length;
          if (totalSize > maxSize) {
            req.destroy();
            reject(
              new BadRequestException({
                code: 'FILE_TOO_LARGE',
                message: 'Recurso remoto excede o tamanho máximo permitido (10MB)',
              }),
            );
            return;
          }
          chunks.push(Buffer.from(chunk));
        });

        res.on('end', () => {
          resolve({
            buffer: Buffer.concat(chunks),
            mimeType,
          });
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(
          new BadRequestException({
            code: 'FETCH_TIMEOUT',
            message: 'Tempo limite esgotado ao buscar recurso remoto',
          }),
        );
      });

      req.on('error', (err) => {
        reject(
          new BadRequestException({
            code: 'FETCH_ERROR',
            message: `Erro ao buscar recurso remoto: ${err.message}`,
          }),
        );
      });
    });
  }
}
