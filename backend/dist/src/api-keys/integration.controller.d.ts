import { SubmissionsService } from '../submissions/submissions.service';
import { SubmissionValidationService } from '../submissions/submission-validation.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmissionDto } from '../submissions/dto/create-submission.dto';
import { SubmissionCreatedResponseDto } from '../submissions/dto/submission-response.dto';
export declare class IntegrationController {
    private readonly submissionsService;
    private readonly validationService;
    private readonly prisma;
    constructor(submissionsService: SubmissionsService, validationService: SubmissionValidationService, prisma: PrismaService);
    submitViaApi(documentId: string, body: CreateSubmissionDto): Promise<SubmissionCreatedResponseDto>;
    validatePayload(documentId: string, body: CreateSubmissionDto): Promise<import("../submissions/submission-validation.service").SubmissionValidationResult>;
}
