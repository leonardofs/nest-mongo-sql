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

  @MessagePattern({ cmd: 'find-carts-for-user' })
  async findAllbyUser(@Payload() id: number) {
    return this.shoppingCartService.findAllbyUser(id);
  }

  @MessagePattern({ cmd: 'add-to-shopping-cart' })
  async addToCart(
    @Payload() shoppingCart: Partial<ShoppingCartDto>,
  ): Promise<ShoppingCartDto> {
    try {
      return await this.shoppingCartService.addProducts(shoppingCart);
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: 'remove-from-shopping-cart' })
  async removeToCart(
    @Payload() shoppingCart: ShoppingCartDto,
  ): Promise<ShoppingCartDto> {
    try {
      return await this.shoppingCartService.removeProducts(shoppingCart);
    } catch (error) {
      throw error;
    }
  }
}
