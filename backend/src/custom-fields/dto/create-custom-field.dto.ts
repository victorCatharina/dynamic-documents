import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateCustomFieldDto {
  @ApiProperty({
    example: 'nomePaciente',
    description: 'Chave única do campo (sem espaços, camelCase ou snake_case)',
  })
  @IsString()
  @IsNotEmpty({ message: 'Chave do campo é obrigatória' })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Chave do campo deve conter apenas letras, números e underscores',
  })
  @MaxLength(100)
  key: string;

  @ApiProperty({
    example: 'Nome do Paciente',
    description: 'Rótulo legível do campo',
  })
  @IsString()
  @IsNotEmpty({ message: 'Rótulo do campo é obrigatório' })
  @MaxLength(255)
  label: string;

  @ApiProperty({ enum: ['TEXT', 'NUMBER', 'DATE', 'PHONE', 'EMAIL', 'ID'] })
  @IsString()
  type: string;

  @ApiProperty({ enum: ['MANUAL', 'ID'] })
  @IsString()
  inputMode: string;

  @ApiPropertyOptional({
    description: 'Regras de validação (ex: { required: true, minLength: 3 })',
  })
  @IsOptional()
  validation?: any;

  @ApiPropertyOptional({
    description: 'Regras de formatação (ex: { mask: "000.000.000-00" })',
  })
  @IsOptional()
  formatting?: any;
}
