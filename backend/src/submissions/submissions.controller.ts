import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionCreatedResponseDto } from './dto/submission-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Submissions')
@Controller('api/v1')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT')
  @Get('submissions')
  @ApiOperation({ summary: 'Listar histórico de preenchimentos' })
  @ApiResponse({ status: 200, description: 'Lista paginada de submissions' })
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('documentId') documentId?: string,
  ) {
    return this.submissionsService.findAll({ page, limit, documentId });
  }

  @Public()
  @Get('submissions/:id')
  @ApiOperation({ summary: 'Consultar detalhes de uma submission' })
  @ApiResponse({ status: 200, description: 'Detalhes da submission' })
  @ApiResponse({ status: 404, description: 'Submission não encontrada' })
  async findById(@Param('id') id: string) {
    return this.submissionsService.findById(id);
  }

  @Public()
  @Get('submissions/:id/document')
  @ApiOperation({ summary: 'Baixar o documento PDF gerado da submission' })
  @ApiResponse({ status: 200, description: 'Stream do arquivo PDF' })
  @ApiResponse({ status: 404, description: 'Documento não encontrado' })
  async getDocument(@Param('id') id: string, @Res() res: Response) {
    const { stream, originalName, size } =
      await this.submissionsService.getDocumentStream(id);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Length', size);
    res.setHeader(
      'Content-Disposition',
      `inline; filename="${encodeURIComponent(originalName)}"`,
    );
    stream.pipe(res);
  }
}
