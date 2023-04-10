import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class ProductIdentity {
  @ApiProperty({
    description: 'ID do produto - UUID V4',
    example: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
  })
  @IsNotEmpty()
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Nome do produto',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Descrição do produto',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 267.32,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({
    description: 'Quantidade do produto',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;
}
