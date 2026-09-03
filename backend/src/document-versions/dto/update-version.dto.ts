import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateVersionDto {
  @ApiProperty({
    description: 'Template JSON completo atualizado',
    example: {
      page: { size: 'A4', orientation: 'PORTRAIT' },
      pages: [
        {
          number: 1,
          fields: [
            {
              id: 'field-1',
              key: 'nomeCliente',
              type: 'TEXT',
              inputMode: 'MANUAL',
              position: { x: 50, y: 50, width: 200, height: 30 },
            },
          ],
        },
      ],
    },
  })
  @IsNotEmpty({ message: 'Template é obrigatório' })
  template: any;
}
