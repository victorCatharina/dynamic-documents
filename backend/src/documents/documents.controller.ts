import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { QueryDocumentsDto } from './dto/query-documents.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Documents')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo documento lógico (gera versão 1 inicial)' })
  @ApiResponse({ status: 201, description: 'Documento criado com sucesso' })
  async create(
    @Body() createDto: CreateDocumentDto,
    @CurrentUser('userId') userId: string,
  ) {
    return this.documentsService.create(createDto, userId);
  }

  @Get()
  @ApiOperation({ summary: 'Listar documentos com paginação e busca' })
  @ApiResponse({ status: 200, description: 'Lista paginada de documentos' })
  async findAll(@Query() query: QueryDocumentsDto) {
    return this.documentsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar documento por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes do documento' })
  @ApiResponse({ status: 404, description: 'Documento não encontrado' })
  async findById(@Param('id') id: string) {
    return this.documentsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar metadados do documento' })
  @ApiResponse({ status: 200, description: 'Documento atualizado' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover documento (soft delete)' })
  @ApiResponse({ status: 204, description: 'Documento removido' })
  async delete(@Param('id') id: string) {
    await this.documentsService.delete(id);
  }

  @Get(':id/schema')
  @ApiOperation({ summary: 'Consultar schema de campos do documento' })
  @ApiResponse({ status: 200, description: 'Schema de campos retornado' })
  async getSchema(@Param('id') id: string) {
    return this.documentsService.getSchema(id);
  }
}
