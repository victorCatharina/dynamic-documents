import { PrismaService } from '../prisma/prisma.service';
import { TemplateValidatorService } from '../templates/template-validator.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { DocumentVersion } from '@prisma/client';
import { DocumentTemplate } from '../templates/template.types';
export declare class DocumentVersionsService {
    private readonly prisma;
    private readonly templateValidator;
    private readonly logger;
    constructor(prisma: PrismaService, templateValidator: TemplateValidatorService);
    getDefaultTemplate(): DocumentTemplate;
    createVersion(documentId: string, createDto: CreateVersionDto): Promise<DocumentVersion>;
    findAllByDocument(documentId: string): Promise<DocumentVersion[]>;
    findById(documentId: string, versionId: string): Promise<DocumentVersion>;
    updateVersion(documentId: string, versionId: string, updateDto: UpdateVersionDto): Promise<DocumentVersion>;
    publishVersion(documentId: string, versionId: string): Promise<DocumentVersion>;
}
