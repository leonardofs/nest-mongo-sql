import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveProductDto } from './DTO/remove-product.Dto';
import { CartDto } from './DTO/cart.Dto';
import { AddProductDto } from './DTO/add-product.Dto';

@ApiTags('Cart')
@Controller('cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiBearerAuth()
  @ApiOperation({
    summary:
      'Retorna todos os carrinhso de um usuario, usa o barrier token para obter o userId do usuario',
  })
  @ApiOkResponse({
    description: 'Carrinhos listados com sucesso',
    type: [CartDto],
  })
  @Get('/')
  async findAllFromUser(): Promise<CartDto[]> {
    //TODO pegar usuario do bearer TOKEN e injetar o valor na requisicao
    const userId = 1;
    return this.shoppingCartService.findCartsFromUser(userId);
  }

  @ApiOperation({ summary: 'Cria carrinho e adiciona um produto a ele' })
  @ApiOkResponse({
    description: 'Carrinho criado com sucesso',
    type: CartDto,
  })
  @ApiBody({ type: AddProductDto })
  @Post('/')
  async createCartAndaddProduct(
    @Param('cartId') cartId: string,
    @Body() addProductDto: AddProductDto,
  ) {
    return this.shoppingCartService.addProduct(null, addProductDto);
  }

  @ApiOperation({ summary: 'Adiciona um produto ao carrinho' })
  @ApiOkResponse({
    description: 'Carrinho atualizado com sucesso',
    type: CartDto,
  })
  @ApiBody({ type: AddProductDto })
  @Put(':cartId/product')
  async addProduct(
    @Param('cartId') cartId: string,
    @Body() addProductDto: AddProductDto,
  ) {
    return this.shoppingCartService.addProduct(cartId, addProductDto);
  }

  @ApiOperation({
    summary:
      'remove um produto do carrinho se a quantidade for passada for maior que a atual ou nao for passada sera removido o item do carrinho',
  })
  @ApiOkResponse({
    description: 'Carrinho atualizado com sucesso',
    type: CartDto,
  })
  @ApiBody({ type: RemoveProductDto })
  @Delete(':cartId/product')
  async removeProduct(
    @Param('cartId') cartId: string,
    @Body() removeProductDto: RemoveProductDto,
  ) {
    return this.shoppingCartService.removeProduct(cartId, removeProductDto);
  }
}
