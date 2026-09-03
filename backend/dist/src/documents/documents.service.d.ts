import { PrismaService } from '../prisma/prisma.service';
import { DocumentVersionsService } from '../document-versions/document-versions.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { QueryDocumentsDto } from './dto/query-documents.dto';
import { Document } from '@prisma/client';
export declare class DocumentsService {
    private readonly prisma;
    private readonly versionsService;
    private readonly logger;
    constructor(prisma: PrismaService, versionsService: DocumentVersionsService);
    private generatePublicToken;
    create(createDto: CreateDocumentDto, userId?: string): Promise<Document>;
    findAll(query: QueryDocumentsDto): Promise<{
        data: ({
            versions: {
                id: string;
                createdAt: Date;
                versionNumber: number;
                status: string;
                publishedAt: Date;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            status: string;
            publicToken: string;
            publishedVersionId: string | null;
            accessMode: string;
            createdById: string | null;
            deletedAt: Date | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findById(id: string): Promise<Document>;
    update(id: string, updateDto: UpdateDocumentDto): Promise<Document>;
    delete(id: string): Promise<void>;
    getSchema(documentId: string): Promise<{
        documentId: string;
        documentName: string;
        version: any;
        versionId: any;
        versionStatus: any;
        fields: any[];
    }>;
}
