import { DocumentVersionsService } from './document-versions.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
export declare class DocumentVersionsController {
    private readonly versionsService;
    constructor(versionsService: DocumentVersionsService);
    createVersion(documentId: string, createDto: CreateVersionDto): Promise<{
        id: string;
        createdAt: Date;
        template: string;
        documentId: string;
        versionNumber: number;
        status: string;
        publishedAt: Date | null;
    }>;
    findAll(documentId: string): Promise<{
        id: string;
        createdAt: Date;
        template: string;
        documentId: string;
        versionNumber: number;
        status: string;
        publishedAt: Date | null;
    }[]>;
    findById(documentId: string, versionId: string): Promise<{
        id: string;
        createdAt: Date;
        template: string;
        documentId: string;
        versionNumber: number;
        status: string;
        publishedAt: Date | null;
    }>;
    updateVersion(documentId: string, versionId: string, updateDto: UpdateVersionDto): Promise<{
        id: string;
        createdAt: Date;
        template: string;
        documentId: string;
        versionNumber: number;
        status: string;
        publishedAt: Date | null;
    }>;
    publishVersion(documentId: string, versionId: string): Promise<{
        id: string;
        createdAt: Date;
        template: string;
        documentId: string;
        versionNumber: number;
        status: string;
        publishedAt: Date | null;
    }>;
}
