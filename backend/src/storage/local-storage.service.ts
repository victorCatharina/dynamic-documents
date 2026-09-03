import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { IStorageService, UploadOptions } from './storage.interface';
import { Asset } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { Readable } from 'stream';

@Injectable()
export class LocalStorageService implements IStorageService {
  private readonly logger = new Logger(LocalStorageService.name);
  private readonly uploadsDir: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    this.uploadsDir = path.resolve(
      process.cwd(),
      this.configService.get<string>('storage.localPath') || './uploads',
    );
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async upload(fileBuffer: Buffer, options: UploadOptions): Promise<Asset> {
    const ext = path.extname(options.originalName);
    const storageKey = `${uuidv4()}${ext}`;
    const filePath = path.join(this.uploadsDir, storageKey);

    await fs.promises.writeFile(filePath, fileBuffer);

    const asset = await this.prisma.asset.create({
      data: {
        storageKey,
        originalName: options.originalName,
        mimeType: options.mimeType,
        size: fileBuffer.length,
        url: `/api/v1/assets/${storageKey}`,
        documentId: options.documentId || null,
      },
    });

    this.logger.log(`Asset stored locally: ${asset.id} (${options.originalName})`);
    return asset;
  }

  async delete(assetId: string): Promise<void> {
    const asset = await this.prisma.asset.findUnique({
      where: { id: assetId },
    });

    if (asset) {
      const filePath = path.join(this.uploadsDir, asset.storageKey);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
      await this.prisma.asset.delete({
        where: { id: assetId },
      });
      this.logger.log(`Asset deleted: ${assetId}`);
    }
  }

  async getSignedUrl(assetId: string): Promise<string> {
    const asset = await this.prisma.asset.findUnique({
      where: { id: assetId },
    });
    if (!asset) {
      throw new NotFoundException({
        code: 'ASSET_NOT_FOUND',
        message: 'Asset não encontrado',
      });
    }
    return `/api/v1/assets/${asset.storageKey}`;
  }

  async getObject(assetId: string): Promise<Buffer> {
    const asset = await this.prisma.asset.findUnique({
      where: { id: assetId },
    });
    if (!asset) {
      throw new NotFoundException({
        code: 'ASSET_NOT_FOUND',
        message: 'Asset não encontrado',
      });
    }

    const filePath = path.join(this.uploadsDir, asset.storageKey);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException({
        code: 'FILE_NOT_FOUND',
        message: 'Arquivo físico não encontrado no storage',
      });
    }

    return fs.promises.readFile(filePath);
  }

  async getStream(assetId: string): Promise<Readable> {
    const asset = await this.prisma.asset.findUnique({
      where: { id: assetId },
    });
    if (!asset) {
      throw new NotFoundException({
        code: 'ASSET_NOT_FOUND',
        message: 'Asset não encontrado',
      });
    }

    const filePath = path.join(this.uploadsDir, asset.storageKey);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException({
        code: 'FILE_NOT_FOUND',
        message: 'Arquivo físico não encontrado no storage',
      });
    }

    return fs.createReadStream(filePath);
  }

  async getByStorageKey(storageKey: string): Promise<{ asset: Asset; stream: Readable }> {
    const asset = await this.prisma.asset.findFirst({
      where: { storageKey },
    });
    if (!asset) {
      throw new NotFoundException({
        code: 'ASSET_NOT_FOUND',
        message: 'Asset não encontrado',
      });
    }
    const filePath = path.join(this.uploadsDir, asset.storageKey);
    if (!fs.existsSync(filePath)) {
      throw new NotFoundException({
        code: 'FILE_NOT_FOUND',
        message: 'Arquivo físico não encontrado no storage',
      });
    }
    return { asset, stream: fs.createReadStream(filePath) };
  }
}
