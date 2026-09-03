import { ImportService } from './import.service';
export declare class ImportController {
    private readonly importService;
    constructor(importService: ImportService);
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
