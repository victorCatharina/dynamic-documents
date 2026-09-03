import { SubmissionsService } from './submissions.service';
import { Response } from 'express';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    findAll(page?: number, limit?: number, documentId?: string): Promise<{
        data: ({
            document: {
                id: string;
                name: string;
            };
            documentVersion: {
                id: string;
                versionNumber: number;
                status: string;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            data: string;
            documentId: string;
            status: string;
            documentVersionId: string;
            generatedAssetId: string | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findById(id: string): Promise<{
        document: {
            id: string;
            name: string;
            publicToken: string;
        };
        documentVersion: {
            id: string;
            versionNumber: number;
            status: string;
        };
        generatedAsset: {
            id: string;
            createdAt: Date;
            documentId: string | null;
            storageKey: string;
            originalName: string;
            mimeType: string;
            size: number;
            url: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: string;
        documentId: string;
        status: string;
        documentVersionId: string;
        generatedAssetId: string | null;
    }>;
    getDocument(id: string, res: Response): Promise<void>;
}
