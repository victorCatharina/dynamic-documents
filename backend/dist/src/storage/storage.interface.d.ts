import { Asset } from '@prisma/client';
import { Readable } from 'stream';
export interface UploadOptions {
    originalName: string;
    mimeType: string;
    documentId?: string;
}
export interface IStorageService {
    upload(fileBuffer: Buffer, options: UploadOptions): Promise<Asset>;
    delete(assetId: string): Promise<void>;
    getSignedUrl(assetId: string, expiresInSeconds?: number): Promise<string>;
    getObject(assetId: string): Promise<Buffer>;
    getStream(assetId: string): Promise<Readable>;
}
