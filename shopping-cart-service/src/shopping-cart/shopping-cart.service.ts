import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Product } from './entities/products.entity';
import { ShoppingCartDto } from './dto/shopping-cart.dto';

type Operation = 'add' | 'sub';
type updateReturn = {
  success: boolean;
  message: string;
};
@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
  ) {}

  //  Description
  // This function  adds or remove products to an existing array of products while updating the quantity of existing products.
  //  where use operation :
  //  - add : If an existing product is found, its quantity is updated. Otherwise, a new product is added to the accumulator array.
  // - remove:
  //      If an existing product is found, its quantity is updated.
  //      If the quantity of an existing product reaches zero, the product is removed from the accumulator array.
  //      If a product with the given ID is not found in the array or if the resulting quantity of a product would be negative, an error is returned.

  updateProducts(
    originalProducts: Product[],
    updateProducts: Product[],
    operation: Operation,
  ): Product[] {
    const products = [...originalProducts];
    for (const updateProduct of updateProducts) {
      const existingProduct = products.find((p) => p.id === updateProduct.id);

      if (existingProduct && operation === 'add') {
        existingProduct.quantity += updateProduct.quantity;
      } else if (existingProduct && operation === 'sub') {
        existingProduct.quantity -= updateProduct.quantity;
        if (existingProduct.quantity < 0) {
          throw new Error(
            `Product ${existingProduct.id} cannot have negative quantity.`,
          );
        } else if (existingProduct.quantity === 0) {
          const index = products.findIndex((p) => p.id === existingProduct.id);
          products.splice(index, 1);
        }
      } else if (!existingProduct && operation === 'add') {
        products.push(updateProduct);
      } else {
        throw new Error(
          `Product ${updateProduct.id} does not exist in the shopping cart.`,
        );
      }
    }
    return products;
  }

  async updateShoppingCart(
    shoppingCart: ShoppingCartDto,
    operation,
  ): Promise<updateReturn> {
    // TODO validade shopping card  is same to request change
    const { shoppingCartId, products } = shoppingCart;
    const shoppingCartExist = await this.shoppingCartRepository.findOne({
      where: { shoppingCartId },
    });

    try {
      if (!shoppingCartExist && operation === 'sub') {
        return {
          success: false,
          message: `Shopping cart with id ${shoppingCartId} not found`,
        };
      } else if (!shoppingCartExist) {
        this.shoppingCartRepository.save(shoppingCart); // TODO Validade params in dto class
      }

      shoppingCartExist.products = this.updateProducts(
        shoppingCartExist.products,
        products,
        operation,
      );

      await this.shoppingCartRepository.save(shoppingCartExist);
      return { success: true, message: 'Shopping Cart successful updated' };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
