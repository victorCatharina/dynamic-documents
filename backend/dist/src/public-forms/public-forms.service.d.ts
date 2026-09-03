import { PrismaService } from '../prisma/prisma.service';
import { SubmissionsService } from '../submissions/submissions.service';
export declare class PublicFormsService {
    private readonly prisma;
    private readonly submissionsService;
    private readonly logger;
    constructor(prisma: PrismaService, submissionsService: SubmissionsService);
    getPublicForm(publicToken: string): Promise<{
        documentName: string;
        description: string;
        publicToken: string;
        version: any;
        fields: any[];
    }>;
    submitPublicForm(publicToken: string, data: Record<string, any>): Promise<import("../submissions/dto/submission-response.dto").SubmissionCreatedResponseDto>;
}
