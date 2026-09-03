import { PrismaService } from '../prisma/prisma.service';
import { SubmissionValidationService } from './submission-validation.service';
import { RenderingService } from '../rendering/rendering.service';
import { StorageService } from '../storage/storage.service';
import { SubmissionCreatedResponseDto } from './dto/submission-response.dto';
import { Readable } from 'stream';
export declare class SubmissionsService {
    private readonly prisma;
    private readonly validator;
    private readonly renderingService;
    private readonly storageService;
    private readonly logger;
    constructor(prisma: PrismaService, validator: SubmissionValidationService, renderingService: RenderingService, storageService: StorageService);
    createSubmission(documentId: string, data: Record<string, any>, isPublicForm?: boolean): Promise<SubmissionCreatedResponseDto>;
    findAll(query: {
        page?: number;
        limit?: number;
        documentId?: string;
    }): Promise<{
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
            documentId: string;
            status: string;
            data: string;
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
    findById(submissionId: string): Promise<{
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
        documentId: string;
        status: string;
        data: string;
        documentVersionId: string;
        generatedAssetId: string | null;
    }>;
    getDocumentStream(submissionId: string): Promise<{
        stream: Readable;
        originalName: string;
        size: number;
    }>;
}
