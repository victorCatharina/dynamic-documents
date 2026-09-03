import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ApiKeysService } from './api-keys.service';
import { CreateApiKeyDto } from './dto/create-api-key.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('API Keys')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  @ApiOperation({ summary: 'Gerar nova API Key para integrações externas' })
  @ApiResponse({
    status: 201,
    description: 'Chave criada (o valor em texto claro é exibido apenas uma vez)',
  })
  async create(@Body() createDto: CreateApiKeyDto) {
    return this.apiKeysService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar API Keys cadastradas' })
  @ApiResponse({ status: 200, description: 'Lista de chaves' })
  async findAll() {
    return this.apiKeysService.findAll();
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revogar API Key' })
  @ApiResponse({ status: 204, description: 'Chave revogada com sucesso' })
  async revoke(@Param('id') id: string) {
    await this.apiKeysService.revoke(id);
  }
}
