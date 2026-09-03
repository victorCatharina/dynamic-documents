import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';

export class CreateSubmissionDto {
  @ApiProperty({
    description: 'Valores dos campos para preenchimento do documento',
    example: {
      nomeCliente: 'João Silva',
      cpfCliente: '12345678900',
      nomePaciente: 'Maria Silva',
      numeroContrato: 'CTR-001',
    },
  })
  @IsObject()
  @IsNotEmpty({ message: 'Objeto de dados (data) é obrigatório' })
  data: Record<string, any>;
}
