import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentVersionsService } from './document-versions.service';
import { CreateVersionDto } from './dto/create-version.dto';
import { UpdateVersionDto } from './dto/update-version.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Document Versions')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/documents/:documentId/versions')
export class DocumentVersionsController {
  constructor(private readonly versionsService: DocumentVersionsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova versão de um documento' })
  @ApiResponse({ status: 201, description: 'Versão criada com sucesso' })
  async createVersion(
    @Param('documentId') documentId: string,
    @Body() createDto: CreateVersionDto,
  ) {
    return this.versionsService.createVersion(documentId, createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as versões de um documento' })
  @ApiResponse({ status: 200, description: 'Lista de versões' })
  async findAll(@Param('documentId') documentId: string) {
    return this.versionsService.findAllByDocument(documentId);
  }

  @Get(':versionId')
  @ApiOperation({ summary: 'Buscar detalhes de uma versão do documento' })
  @ApiResponse({ status: 200, description: 'Detalhes da versão' })
  @ApiResponse({ status: 404, description: 'Versão não encontrada' })
  async findById(
    @Param('documentId') documentId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.versionsService.findById(documentId, versionId);
  }

  @Put(':versionId')
  @ApiOperation({ summary: 'Atualizar template de uma versão em rascunho (DRAFT)' })
  @ApiResponse({ status: 200, description: 'Versão atualizada' })
  @ApiResponse({
    status: 409,
    description: 'Conflito: Versões publicadas não podem ser alteradas',
  })
  async updateVersion(
    @Param('documentId') documentId: string,
    @Param('versionId') versionId: string,
    @Body() updateDto: UpdateVersionDto,
  ) {
    return this.versionsService.updateVersion(documentId, versionId, updateDto);
  }

  @Post(':versionId/publish')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Publicar versão do documento' })
  @ApiResponse({ status: 200, description: 'Versão publicada com sucesso' })
  @ApiResponse({ status: 400, description: 'Template inválido para publicação' })
  async publishVersion(
    @Param('documentId') documentId: string,
    @Param('versionId') versionId: string,
  ) {
    return this.versionsService.publishVersion(documentId, versionId);
  }
}
