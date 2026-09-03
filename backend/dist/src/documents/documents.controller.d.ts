import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { QueryDocumentsDto } from './dto/query-documents.dto';
export declare class DocumentsController {
    private readonly documentsService;
    constructor(documentsService: DocumentsService);
    create(createDto: CreateDocumentDto, userId: string): Promise<{
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
    }>;
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
    findById(id: string): Promise<{
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
    }>;
    update(id: string, updateDto: UpdateDocumentDto): Promise<{
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
    }>;
    delete(id: string): Promise<void>;
    getSchema(id: string): Promise<{
        documentId: string;
        documentName: string;
        version: any;
        versionId: any;
        versionStatus: any;
        fields: any[];
    }>;
}
