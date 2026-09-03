import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateDocumentDto {
  @ApiProperty({
    example: 'Contrato de Prestação de Serviço',
    description: 'Nome do documento',
  })
  @IsString({ message: 'Nome deve ser uma string' })
  @IsNotEmpty({ message: 'Nome do documento é obrigatório' })
  @MaxLength(255, { message: 'Nome não pode ter mais de 255 caracteres' })
  name: string;

  @ApiPropertyOptional({
    example: 'Contrato padrão de atendimento e prestação de serviços',
    description: 'Descrição opcional do documento',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;
}
