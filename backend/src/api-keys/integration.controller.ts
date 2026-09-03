import {
  Controller,
  Post,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiKeyGuard } from './guards/api-key.guard';
import { SubmissionsService } from '../submissions/submissions.service';
import { SubmissionValidationService } from '../submissions/submission-validation.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSubmissionDto } from '../submissions/dto/create-submission.dto';
import { SubmissionCreatedResponseDto } from '../submissions/dto/submission-response.dto';
import { DocumentTemplate } from '../templates/template.types';

@ApiTags('Integrations (API Key)')
@ApiBearerAuth('API_KEY')
@UseGuards(ApiKeyGuard)
@Controller('api/v1/documents')
export class IntegrationController {
  constructor(
    private readonly submissionsService: SubmissionsService,
    private readonly validationService: SubmissionValidationService,
    private readonly prisma: PrismaService,
  ) {}

  @Post(':id/submissions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Enviar dados via API externa para geração de documento (requer API Key)',
  })
  @ApiResponse({
    status: 200,
    description: 'Documento gerado com sucesso',
    type: SubmissionCreatedResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Erro de validação nos campos do documento',
  })
  async submitViaApi(
    @Param('id') documentId: string,
    @Body() body: CreateSubmissionDto,
  ) {
    // isPublicForm = false -> allows both INTEGRATION and MANUAL fields
    return this.submissionsService.createSubmission(documentId, body.data, false);
  }

  @Post(':id/validate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Validar payload de dados para um documento sem gerar a submission',
  })
  @ApiResponse({
    status: 200,
    description: 'Resultado da validação',
  })
  async validatePayload(
    @Param('id') documentId: string,
    @Body() body: CreateSubmissionDto,
  ) {
    const document = await this.prisma.document.findFirst({
      where: { id: documentId, deletedAt: null },
    });

    if (!document) {
      throw new NotFoundException({
        code: 'DOCUMENT_NOT_FOUND',
        message: 'Documento não encontrado',
      });
    }

    let version = null;
    if (document.publishedVersionId) {
      version = await this.prisma.documentVersion.findUnique({
        where: { id: document.publishedVersionId },
      });
    }

    if (!version) {
      version = await this.prisma.documentVersion.findFirst({
        where: { documentId, status: 'PUBLISHED' },
        orderBy: { versionNumber: 'desc' },
      });
    }

    if (!version) {
      version = await this.prisma.documentVersion.findFirst({
        where: { documentId },
        orderBy: { versionNumber: 'desc' },
      });
    }

    if (!version) {
      throw new NotFoundException({
        code: 'NO_VERSION_AVAILABLE',
        message: 'Documento não possui versão para validação',
      });
    }

    const template = version.template as unknown as DocumentTemplate;
    const result = this.validationService.validate(template, body.data || {}, {
      allowIntegrationFields: true,
    });

    return result;
  }
}
