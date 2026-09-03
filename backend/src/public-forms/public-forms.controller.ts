import { Controller, Get, Post, Param, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PublicFormsService } from './public-forms.service';
import { CreateSubmissionDto } from '../submissions/dto/create-submission.dto';
import { SubmissionCreatedResponseDto } from '../submissions/dto/submission-response.dto';
import { Public } from '../common/decorators/public.decorator';

@ApiTags('Public Forms')
@Public()
@Controller('api/v1/public/forms')
export class PublicFormsController {
  constructor(private readonly publicFormsService: PublicFormsService) {}

  @Get(':publicToken')
  @ApiOperation({ summary: 'Obter configuração e campos manuais de um formulário público' })
  @ApiResponse({ status: 200, description: 'Formulário público retornado' })
  @ApiResponse({ status: 404, description: 'Formulário não encontrado' })
  async getPublicForm(@Param('publicToken') publicToken: string) {
    return this.publicFormsService.getPublicForm(publicToken);
  }

  @Post(':publicToken/submissions')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Enviar dados de preenchimento via formulário público' })
  @ApiResponse({
    status: 200,
    description: 'Documento gerado com sucesso',
    type: SubmissionCreatedResponseDto,
  })
  @ApiResponse({
    status: 422,
    description: 'Erro de validação ou envio indevido de campo INTEGRATION',
  })
  async submitPublicForm(
    @Param('publicToken') publicToken: string,
    @Body() body: CreateSubmissionDto,
  ) {
    return this.publicFormsService.submitPublicForm(publicToken, body.data);
  }
}
