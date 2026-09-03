import { ApiProperty } from '@nestjs/swagger';

export class SubmissionCreatedResponseDto {
  @ApiProperty({ example: 'sub-123-uuid' })
  submissionId: string;

  @ApiProperty({ example: 'doc-123-uuid' })
  documentId: string;

  @ApiProperty({ example: 1 })
  version: number;

  @ApiProperty({ example: 'GENERATED' })
  status: string;

  @ApiProperty({ example: '/api/v1/submissions/sub-123-uuid/document' })
  documentUrl: string;
}
