import { PublicFormsService } from './public-forms.service';
import { CreateSubmissionDto } from '../submissions/dto/create-submission.dto';
import { SubmissionCreatedResponseDto } from '../submissions/dto/submission-response.dto';
export declare class PublicFormsController {
    private readonly publicFormsService;
    constructor(publicFormsService: PublicFormsService);
    getPublicForm(publicToken: string): Promise<{
        documentName: string;
        description: string;
        publicToken: string;
        version: any;
        fields: any[];
    }>;
    submitPublicForm(publicToken: string, body: CreateSubmissionDto): Promise<SubmissionCreatedResponseDto>;
}
