import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CartDto } from './DTO/cart.Dto';
import { ClientProxy } from '@nestjs/microservices';
import { RemoveProductDto } from './DTO/remove-product.Dto';
import { AddProductDto } from './DTO/add-product.Dto';
import { Observable, firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class ShoppingCartService {
  constructor(
    @Inject('SHOPPING_CART_SERVICE')
    private readonly shoppingCartClient: ClientProxy,
  ) {}

  findCartsFromUser(userId = 1) {
    const pattern = { cmd: 'find-carts-from-user' };

    const carts = this.shoppingCartClient
      .send<CartDto[]>(pattern, userId)
      .pipe(timeout(5000));
    if (!carts) {
      throw new NotFoundException('Internal Error');
    }
    return carts;
  }

  async removeProduct(
    cartId: string,
    userId = 1,
    products: RemoveProductDto[],
  ) {
    const pattern = { cmd: 'remove-from-shopping-cart' };
    const data = { userId, products, shoppingCartId: cartId };
    const resultCart = await firstValueFrom(
      this.shoppingCartClient.send<CartDto>(pattern, data).pipe(timeout(5000)),
    );

    return resultCart;
  }
  addProduct(
    userId = 1,
    products: AddProductDto[],
    cartId: string = null,
  ): Observable<CartDto> {
    const pattern = { cmd: 'add-to-shopping-cart' };
    const data = { userId, cartId, products };

    const cart = this.shoppingCartClient
      .send<CartDto>(pattern, data)
      .pipe(timeout(5000));
    if (!cart) {
      throw new NotFoundException('Cart not found or created');
    }
    return cart;
  }
}
