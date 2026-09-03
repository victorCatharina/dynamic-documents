import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateVersionDto {
  @ApiPropertyOptional({
    example: 'version-uuid-to-clone-from',
    description: 'ID de versão existente para clonar template',
  })
  @IsOptional()
  @IsString()
  sourceVersionId?: string;

  @ApiPropertyOptional({
    description: 'Template JSON inicial customizado',
  })
  @IsOptional()
  template?: any;
}
