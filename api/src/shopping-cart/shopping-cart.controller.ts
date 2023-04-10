import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RemoveProductDto } from './DTO/remove-product.Dto';
import { CartDto } from './DTO/cart.Dto';
import { AddProductDto } from './DTO/add-product.Dto';
import { Observable } from 'rxjs';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Cart')
@Controller('cart')
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  @ApiOperation({
    summary:
      'Retorna todos os carrinhos de um usuario, usa o barier token para obter o userId do usuario',
  })
  @ApiOkResponse({
    description: 'Carrinhos listados com sucesso',
    type: [CartDto],
  })
  @Get('/')
  findAllFromUser(@CurrentUser() currentUser: User): Observable<CartDto[]> {
    const userId = currentUser.id;
    return this.shoppingCartService.findCartsFromUser(userId);
  }

  @ApiOperation({
    summary: 'Cria carrinho e adiciona um ou mais produtos a ele',
  })
  @ApiCreatedResponse({
    description: 'Carrinho criado com sucesso',
    type: CartDto,
  })
  @ApiBody({ type: [AddProductDto] })
  @Post('/')
  async createCartAndaddProduct(
    @CurrentUser() currentUser: User,
    @Body() addProducts: AddProductDto[],
  ) {
    const userId = currentUser.id;

    return this.shoppingCartService.addProduct(userId, addProducts);
  }

  @ApiOperation({ summary: 'Adiciona um ou mais produtos ao carrinho' })
  @ApiOkResponse({
    description: 'Carrinho atualizado com sucesso',
    type: CartDto,
  })
  @ApiBody({ type: [AddProductDto] })
  @Put(':cartId')
  async addProduct(
    @CurrentUser() currentUser: User,
    @Param('cartId') cartId: string,
    @Body() addProducts: AddProductDto[],
  ) {
    const userId = currentUser.id;
    //TODO userId obter pelo payload do jwt
    return this.shoppingCartService.addProduct(userId, addProducts, cartId);
  }

  @ApiOperation({
    summary:
      'remove um produto do carrinho se a quantidade for passada for maior que a atual ou nao for passada sera removido o item do carrinho',
  })
  @ApiOkResponse({
    description: 'Carrinho atualizado com sucesso',
    type: CartDto,
  })
  @ApiBody({ type: [RemoveProductDto] })
  @Delete(':cartId')
  async removeProduct(
    @Param('cartId') cartId: string,
    @Body() removeProducts: RemoveProductDto[],
  ) {
    const userId = 1;
    //TODO userId obter pelo payload do jwt
    return this.shoppingCartService.removeProduct(
      cartId,
      userId,
      removeProducts,
    );
  }
}
