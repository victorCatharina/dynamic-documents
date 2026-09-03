import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDocumentDto {
  @ApiPropertyOptional({ example: 'Contrato de Prestação Atualizado' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({ example: 'Nova descrição do documento' })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
