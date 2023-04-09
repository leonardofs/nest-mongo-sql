import { ApiProperty } from '@nestjs/swagger';
import { ProductIdentity } from './product.identity';

export class CartDto {
  @ApiProperty({
    description: 'ID do carrinho',
    example: 654321,
  })
  shoppingCartId: number;

  @ApiProperty({
    description: 'ID do usuário',
    example: 123456,
  })
  userId: number;

  @ApiProperty({
    description: 'Preço total do carrinho',
    example: 267.32,
  })
  totalPrice: number;

  @ApiProperty({
    description: 'Quantidade total de produtos no carrinho',
    example: 1,
  })
  totalQuantity: number;

  @ApiProperty({
    type: [ProductIdentity],
    description: 'Lista de produtos do carrinho',
  })
  products: ProductIdentity[];
}
