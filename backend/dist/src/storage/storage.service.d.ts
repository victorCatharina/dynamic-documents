import { ConfigService } from '@nestjs/config';
import { IStorageService, UploadOptions } from './storage.interface';
import { LocalStorageService } from './local-storage.service';
import { S3StorageService } from './s3-storage.service';
import { Asset } from '@prisma/client';
import { Readable } from 'stream';
export declare class StorageService implements IStorageService {
    private readonly configService;
    private readonly localStorageService;
    private readonly s3StorageService;
    private readonly logger;
    private readonly activeStorage;
    constructor(configService: ConfigService, localStorageService: LocalStorageService, s3StorageService: S3StorageService);
    upload(fileBuffer: Buffer, options: UploadOptions): Promise<Asset>;
    delete(assetId: string): Promise<void>;
    getSignedUrl(assetId: string, expiresInSeconds?: number): Promise<string>;
    getObject(assetId: string): Promise<Buffer>;
    getStream(assetId: string): Promise<Readable>;
    fetchRemoteAsset(urlStr: string): Promise<{
        buffer: Buffer;
        mimeType: string;
    }>;
}
