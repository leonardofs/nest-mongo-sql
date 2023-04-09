import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Product } from './entities/products.entity';
import { ShoppingCartDto } from './dto/shopping-cart.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NotFoundError, firstValueFrom } from 'rxjs';

type Operation = 'add' | 'sub';
type Totals = { totalPrice: number; totalQuantity: number };
type updateReturn = {
  success: boolean;
  message: string;
};
@Injectable()
export class ShoppingCartService {
  constructor(
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
    @Inject('PRODUCTS_SERVICE')
    private readonly productServiceClient: ClientProxy,
  ) {}

  findAllbyUser(userId: number) {
    return this.shoppingCartRepository.findBy({ userId });
  }

  getTotals(products: Product[]): Totals {
    let totalPrice = 0;
    let totalQuantity = 0;

    for (const product of products) {
      totalPrice += product.price;
      totalQuantity += product.quantity;
    }

    return { totalPrice, totalQuantity };
  }

  async getProductById(productId: string): Promise<Product> {
    return await firstValueFrom(
      this.productServiceClient.send<Product>('get-by-id', productId),
    );
  }

  async removeProducts(
    shoppingCart: ShoppingCartDto,
  ): Promise<ShoppingCartDto> {
    const { shoppingCartId, products, userId } = shoppingCart;
    const shoppingCartExist = await this.shoppingCartRepository.findOne({
      where: { shoppingCartId },
    });

    if (!shoppingCartExist) {
      throw new Error(`Shopping cart with id ${shoppingCartId} not found`);
    }
    const oldProducts = [...shoppingCartExist.products];
    const updateProducts: Product[] = [...products];

    updateProducts.map((updateProduct) => {
      const productIndex = oldProducts.findIndex(
        (p) => p.id === updateProduct.id,
      ); // procura produta a ser atualizado
      if (productIndex !== -1) {
        // produto existe
        if (!updateProduct.quantity) {
          //  nao foi fornecido a quantidade de itens a remover
          oldProducts.splice(productIndex, 1); // remove todo o produto
        } else {
          // foi fornecido a quantidade de itens a remover
          const newQuantity =
            oldProducts[productIndex].quantity - updateProduct.quantity;
          if (newQuantity < 1) {
            // se  a nova quantidade for zero ou negativo
            oldProducts.splice(productIndex, 1); // remove todo o produto
          } else {
            oldProducts[productIndex].quantity = newQuantity;
          }
        }
      } else {
        // produto a ser removido nao existe na lista atual de produtos
        throw new Error(
          `Product with id ${updateProduct.id} not foundin Shopping cart`,
        );
      }
    });
    const { totalPrice, totalQuantity } = this.getTotals(oldProducts);

    const updatedcart: ShoppingCartDto = {
      shoppingCartId,
      userId,
      products: oldProducts,
      totalPrice,
      totalQuantity,
    };

    return await this.shoppingCartRepository.save(updatedcart);
  }

  async addProducts(
    shoppingCart: Partial<ShoppingCartDto>,
  ): Promise<ShoppingCartDto> {
    const { products, userId } = shoppingCart;
    const { shoppingCartId } = shoppingCart;
    if (!shoppingCartId) {
      return this.createShoppingCart(userId, products);
    }

    try {
      const shoppingCartExist = await this.shoppingCartRepository.findOne({
        where: { shoppingCartId },
      });

      if (!shoppingCartExist) {
        throw new Error(`Shopping cart with id ${shoppingCartId} not found`);
      }
      const oldProducts: Product[] = [...shoppingCartExist.products];
      const updateProducts: Product[] = [...products];

      Promise.all(
        updateProducts.map(async (updateProduct) => {
          const productIndex = oldProducts.findIndex(
            (p) => p.id === updateProduct.id,
          ); // procura item a ser atualizado entre os itens atuais
          if (productIndex === -1) {
            // item a ser atualizado nao existe atualmente entao sera adicionado
            const newProduct = await this.getProductById(updateProduct.id);
            oldProducts.push(newProduct);
          } else {
            oldProducts[productIndex].quantity += updateProduct.quantity;
          }

          const { totalPrice, totalQuantity } = this.getTotals(oldProducts);

          const updatedcart: ShoppingCartDto = {
            shoppingCartId,
            userId,
            products: oldProducts,
            totalPrice,
            totalQuantity,
          };
          return await this.shoppingCartRepository.save(updatedcart);
        }),
      );
    } catch (error) {
      throw error;
    }
  }

  async createShoppingCart(
    userId: number,
    products: Partial<Product[]>,
  ): Promise<ShoppingCartDto> {
    const newProducts: Product[] = [];
    Promise.all(
      products.map(async (p) => {
        const newProduct = await this.getProductById(p.id);
        newProducts.push(newProduct);
      }),
    );
    const { totalPrice, totalQuantity } = this.getTotals(products);
    const cart: Omit<ShoppingCartDto, 'shoppingCartId'> = {
      products: newProducts,
      userId,
      totalPrice,
      totalQuantity,
    };
    return this.shoppingCartRepository.save(cart);
  }
}
