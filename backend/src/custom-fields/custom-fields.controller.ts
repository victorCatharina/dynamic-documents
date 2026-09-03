import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CustomFieldsService } from './custom-fields.service';
import { CreateCustomFieldDto } from './dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from './dto/update-custom-field.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Custom Fields')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/custom-fields')
export class CustomFieldsController {
  constructor(private readonly customFieldsService: CustomFieldsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova definição de campo personalizado' })
  @ApiResponse({ status: 201, description: 'Campo personalizado criado' })
  @ApiResponse({ status: 409, description: 'Chave já existente' })
  async create(@Body() createDto: CreateCustomFieldDto) {
    return this.customFieldsService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar catálogo de campos personalizados' })
  @ApiResponse({ status: 200, description: 'Lista de campos personalizados' })
  async findAll() {
    return this.customFieldsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar campo personalizado por ID' })
  @ApiResponse({ status: 200, description: 'Detalhes do campo personalizado' })
  @ApiResponse({ status: 404, description: 'Campo não encontrado' })
  async findById(@Param('id') id: string) {
    return this.customFieldsService.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar campo personalizado' })
  @ApiResponse({ status: 200, description: 'Campo atualizado' })
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateCustomFieldDto,
  ) {
    return this.customFieldsService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Excluir campo personalizado' })
  @ApiResponse({ status: 204, description: 'Campo excluído' })
  @ApiResponse({
    status: 409,
    description: 'Conflito: campo em uso por versão publicada',
  })
  async delete(@Param('id') id: string) {
    await this.customFieldsService.delete(id);
  }
}
