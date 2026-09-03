import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCustomFieldDto {
  @ApiPropertyOptional({ example: 'Nome Completo do Paciente' })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  label?: string;

  @ApiPropertyOptional({ enum: ['TEXT', 'NUMBER', 'DATE', 'PHONE', 'EMAIL', 'ID'] })
  @IsOptional()
  @IsString()
  type?: string;

  @ApiPropertyOptional({ enum: ['MANUAL', 'ID'] })
  @IsOptional()
  @IsString()
  inputMode?: string;

  @ApiPropertyOptional()
  @IsOptional()
  validation?: any;

  @ApiPropertyOptional()
  @IsOptional()
  formatting?: any;
}
