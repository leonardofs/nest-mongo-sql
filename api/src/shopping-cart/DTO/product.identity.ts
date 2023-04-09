import { ApiProperty } from '@nestjs/swagger';

export class ProductIdentity {
  @ApiProperty({
    description: 'ID do produto - UUID V4',
    example: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  })
  productId: string;

  @ApiProperty({
    description: 'Nome do produto',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição do produto',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 267.32,
  })
  price: number;

  @ApiProperty({
    description: 'Quantidade do produto',
    example: 1,
  })
  quantity: number;
}
