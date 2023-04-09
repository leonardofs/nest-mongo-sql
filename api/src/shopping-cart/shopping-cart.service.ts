import { Inject, Injectable } from '@nestjs/common';
import { CartDto } from './DTO/cart.Dto';
import { ClientProxy } from '@nestjs/microservices';
import { RemoveProductDto } from './DTO/remove-product.Dto';
import { AddProductDto } from './DTO/add-product.Dto';

@Injectable()
export class ShoppingCartService {
  constructor(
    @Inject('SHOPPING_CART_SERVICE')
    private readonly shoppingCartClient: ClientProxy,
  ) {}

  findCartsFromUser(userId: number): CartDto[] {
    const pattern = { cmd: 'find-carts-from-user' };
    const data = { userId };
    const resultCart: CartDto[] = [];
    this.shoppingCartClient
      .send<CartDto[]>(pattern, data)
      .subscribe((carts) => {
        resultCart.push(...carts);
        // TODO TRY PARSE TO CART THE RETURN OR TRHOW ERROR
      });
    return resultCart;
  }

  removeProduct(cartId: string, removeProducts: RemoveProductDto[]): CartDto {
    const pattern = { cmd: 'remove-from-shopping-cart' };
    const data = removeProducts;
    let resultCart: CartDto;
    this.shoppingCartClient.send<CartDto>(pattern, data).subscribe((cart) => {
      resultCart = cart;
      // TODO TRY PARSE TO CART THE RETURN OR TRHOW ERROR
      return cart;
    });
    return resultCart;
  }
  addProduct(cartId: string, addProductDto: AddProductDto[]): CartDto {
    const pattern = { cmd: 'add-to-shopping-cart' };
    const data = addProductDto;
    let resultCart: CartDto;
    this.shoppingCartClient.send<CartDto>(pattern, data).subscribe((cart) => {
      resultCart = cart;
      // TODO TRY PARSE TO CART THE RETURN OR TRHOW ERROR
      return cart;
    });
    return resultCart;
  }
}
