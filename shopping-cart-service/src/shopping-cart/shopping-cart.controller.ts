import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartDto } from './dto/shopping-cart.dto';

type updateReturn = {
  success: boolean;
  message: string;
};
@Controller()
export class ShoppingCartController {
  constructor(private readonly shoppingCartService: ShoppingCartService) {}

  // @MessagePattern('findAllShoppingCart')
  // findAll() {
  //   return this.shoppingCartService.findAll();
  // }

  // @MessagePattern('findOneShoppingCart')
  // findOne(@Payload() id: number) {
  //   return this.shoppingCartService.findOne(id);
  // }

  @MessagePattern('addToShoppingCart')
  async addToCart(
    @Payload() shoppingCart: ShoppingCartDto,
  ): Promise<updateReturn> {
    try {
      return await this.shoppingCartService.updateShoppingCart(
        shoppingCart,
        'add',
      );
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  @MessagePattern('removefromShoppingCart')
  async removeToCart(
    @Payload() shoppingCart: ShoppingCartDto,
  ): Promise<updateReturn> {
    try {
      return await this.shoppingCartService.updateShoppingCart(
        shoppingCart,
        'sub',
      );
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
