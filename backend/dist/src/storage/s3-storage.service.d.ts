import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { IStorageService, UploadOptions } from './storage.interface';
import { Asset } from '@prisma/client';
import { Readable } from 'stream';
export declare class S3StorageService implements IStorageService {
    private readonly prisma;
    private readonly configService;
    private readonly logger;
    private readonly s3Client;
    private readonly bucketName;
    constructor(prisma: PrismaService, configService: ConfigService);
    upload(fileBuffer: Buffer, options: UploadOptions): Promise<Asset>;
    delete(assetId: string): Promise<void>;
    getSignedUrl(assetId: string, expiresInSeconds?: number): Promise<string>;
    getObject(assetId: string): Promise<Buffer>;
    getStream(assetId: string): Promise<Readable>;
}
