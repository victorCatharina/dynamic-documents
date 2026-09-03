import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { IStorageService, UploadOptions } from './storage.interface';
import { Asset } from '@prisma/client';
import { Readable } from 'stream';
export declare class LocalStorageService implements IStorageService {
    private readonly prisma;
    private readonly configService;
    private readonly logger;
    private readonly uploadsDir;
    constructor(prisma: PrismaService, configService: ConfigService);
    upload(fileBuffer: Buffer, options: UploadOptions): Promise<Asset>;
    delete(assetId: string): Promise<void>;
    getSignedUrl(assetId: string): Promise<string>;
    getObject(assetId: string): Promise<Buffer>;
    getStream(assetId: string): Promise<Readable>;
    getByStorageKey(storageKey: string): Promise<{
        asset: Asset;
        stream: Readable;
    }>;
}
