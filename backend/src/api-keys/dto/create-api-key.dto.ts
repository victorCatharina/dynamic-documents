import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty({
    example: 'Sistema Hospitalar ERP',
    description: 'Nome identificador da chave de integração',
  })
  @IsString()
  @IsNotEmpty({ message: 'Nome da API Key é obrigatório' })
  @MaxLength(255)
  name: string;

  @ApiPropertyOptional({
    example: '2027-12-31T23:59:59Z',
    description: 'Data de expiração opcional',
  })
  @IsOptional()
  expiresAt?: string;
}
