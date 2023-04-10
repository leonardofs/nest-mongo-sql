import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';
import { ProductIdentity } from './product.identity';

export class CartDto {
  @ApiProperty({
    description: 'ID do carrinho',
    example: 654321,
  })
  @IsNotEmpty({ message: 'O ID do carrinho é obrigatório' })
  @IsNumber({}, { message: 'O ID do carrinho deve ser um número' })
  readonly shoppingCartId?: number;

  @ApiProperty({
    description: 'ID do usuário',
    example: 123456,
  })
  @IsNotEmpty({ message: 'O ID do usuário é obrigatório' })
  @IsNumber({}, { message: 'O ID do usuário deve ser um número' })
  readonly userId: number;

  @ApiProperty({
    description: 'Preço total do carrinho',
    example: 267.32,
  })
  @IsNotEmpty({ message: 'O preço total é obrigatório' })
  @IsNumber({}, { message: 'O preço total deve ser um número' })
  @IsPositive({ message: 'O preço total deve ser positivo' })
  readonly totalPrice: number;

  @ApiProperty({
    description: 'Quantidade total de produtos no carrinho',
    example: 1,
  })
  @IsNotEmpty({ message: 'A quantidade total é obrigatória' })
  @IsNumber({}, { message: 'A quantidade total deve ser um número' })
  @IsPositive({ message: 'A quantidade total deve ser positiva' })
  readonly totalQuantity: number;

  @ApiProperty({
    type: [ProductIdentity],
    description: 'Lista de produtos do carrinho',
  })
  @IsNotEmpty({ message: 'A lista de produtos é obrigatória' })
  readonly products: ProductIdentity[];
}
