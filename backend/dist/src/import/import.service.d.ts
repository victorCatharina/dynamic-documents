import { PrismaService } from '../prisma/prisma.service';
import { StorageService } from '../storage/storage.service';
import { DocumentVersionsService } from '../document-versions/document-versions.service';
export declare class ImportService {
    private readonly prisma;
    private readonly storageService;
    private readonly versionsService;
    private readonly logger;
    constructor(prisma: PrismaService, storageService: StorageService, versionsService: DocumentVersionsService);
    importPdf(documentId: string, file: Express.Multer.File): Promise<{
        version: {
            id: string;
            createdAt: Date;
            template: string;
            documentId: string;
            versionNumber: number;
            status: string;
            publishedAt: Date | null;
        };
        asset: {
            id: string;
            createdAt: Date;
            documentId: string | null;
            storageKey: string;
            originalName: string;
            mimeType: string;
            size: number;
            url: string | null;
        };
        pageCount: number;
    }>;
    importDocx(documentId: string, file: Express.Multer.File): Promise<{
        version: {
            id: string;
            createdAt: Date;
            template: string;
            documentId: string;
            versionNumber: number;
            status: string;
            publishedAt: Date | null;
        };
        asset: {
            id: string;
            createdAt: Date;
            documentId: string | null;
            storageKey: string;
            originalName: string;
            mimeType: string;
            size: number;
            url: string | null;
        };
        extractedTextPreview: string;
    }>;
}
