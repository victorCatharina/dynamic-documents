import {
  Controller,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportService } from './import.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Import')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('api/v1/documents/:id/import')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post('pdf')
  @ApiOperation({ summary: 'Importar PDF como background para nova versão do documento' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'PDF importado e nova versão criada' })
  @UseInterceptors(FileInterceptor('file'))
  async importPdf(
    @Param('id') documentId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.importService.importPdf(documentId, file);
  }

  @Post('docx')
  @ApiOperation({ summary: 'Importar DOCX como background para nova versão do documento' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'DOCX importado e nova versão criada' })
  @UseInterceptors(FileInterceptor('file'))
  async importDocx(
    @Param('id') documentId: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.importService.importDocx(documentId, file);
  }
}
