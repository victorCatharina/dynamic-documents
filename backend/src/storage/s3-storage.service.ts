import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { IStorageService, UploadOptions } from './storage.interface';
import { Asset } from '@prisma/client';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { Readable } from 'stream';

@Injectable()
export class S3StorageService implements IStorageService {
  private readonly logger = new Logger(S3StorageService.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
  ) {
    const s3Config = this.configService.get('storage');
    this.bucketName = s3Config.bucket || 'documents';

    this.s3Client = new S3Client({
      endpoint: s3Config.endpoint,
      region: s3Config.region || 'us-east-1',
      credentials: {
        accessKeyId: s3Config.accessKey || 'minioadmin',
        secretAccessKey: s3Config.secretKey || 'minioadmin',
      },
      forcePathStyle: s3Config.forcePathStyle ?? true,
    });
  }

  async upload(fileBuffer: Buffer, options: UploadOptions): Promise<Asset> {
    const ext = path.extname(options.originalName);
    const storageKey = `${uuidv4()}${ext}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: storageKey,
        Body: fileBuffer,
        ContentType: options.mimeType,
      }),
    );

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

    this.logger.log(`Asset stored on S3/MinIO: ${asset.id} (${options.originalName})`);
    return asset;
  }

  async delete(assetId: string): Promise<void> {
    const asset = await this.prisma.asset.findUnique({
      where: { id: assetId },
    });

    if (asset) {
      await this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: this.bucketName,
          Key: asset.storageKey,
        }),
      );
      await this.prisma.asset.delete({
        where: { id: assetId },
      });
      this.logger.log(`Asset deleted from S3: ${assetId}`);
    }
  }

  async getSignedUrl(assetId: string, expiresInSeconds: number = 3600): Promise<string> {
    const asset = await this.prisma.asset.findUnique({
      where: { id: assetId },
    });
    if (!asset) {
      throw new NotFoundException({
        code: 'ASSET_NOT_FOUND',
        message: 'Asset não encontrado',
      });
    }

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: asset.storageKey,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn: expiresInSeconds });
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

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: asset.storageKey,
    });

    const response = await this.s3Client.send(command);
    const stream = response.Body as Readable;

    return new Promise<Buffer>((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      stream.on('error', (err) => reject(err));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
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

    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: asset.storageKey,
    });

    const response = await this.s3Client.send(command);
    return response.Body as Readable;
  }
}
