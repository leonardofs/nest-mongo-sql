import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';
import { IsNotEmpty, IsNumber, IsPositive, MinLength } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    example: 1,
    description: 'gerado pelo banco de dados e auto incremental',
  })
  productId: string;

  @ApiProperty({
    example: faker.commerce.productName(),
    description: 'Nome do produto',
  })
  @IsNotEmpty({ message: 'O nome do produto é obrigatório' })
  name: string;

  @ApiProperty({
    example: faker.commerce.productDescription(),
    description: 'Descrição do produto',
    nullable: true,
  })
  @MinLength(10, {
    message: 'A descrição deve ter pelo menos 10 caracteres',
  })
  description?: string;

  @ApiProperty({
    nullable: false,
    example: faker.finance.amount(0, 200, 2),
    description: 'Preço do produto',
  })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsPositive({ message: 'O preço deve ser positivo' })
  price: number;
}
