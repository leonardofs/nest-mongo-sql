import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ShoppingCart } from './entities/shopping-cart.entity';
import { Product } from './entities/products.entity';
import { ShoppingCartDto } from './dto/shopping-cart.dto';
import { ClientProxy } from '@nestjs/microservices';
import { NotFoundError, Observable, firstValueFrom, of, timeout } from 'rxjs';

type Operation = 'add' | 'sub';
type Totals = { totalPrice: number; totalQuantity: number };
type updateReturn = {
  success: boolean;
  message: string;
};
@Injectable()
export class ShoppingCartService {
  constructor(
    @Inject('PRODUCTS_SERVICE')
    private readonly productServiceClient: ClientProxy,
    @InjectRepository(ShoppingCart)
    private readonly shoppingCartRepository: Repository<ShoppingCart>,
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

  async getProductById(product: Product) {
    try {
      const product$ = this.productServiceClient
        .send<Product>({ cmd: 'get-by-id' }, product.productId)
        .pipe(timeout(5000));
      const newProduct = await firstValueFrom(product$);

      if (!newProduct) {
        console.error(`produto with id ${product.productId} not found`);
        return null;
      }
      newProduct.quantity = product.quantity;
      return newProduct;
    } catch (error) {
      console.error(
        'erro ao executar this.productServiceClient.send<Product>(get-by-id, { productId })',
      );
      throw error;
    }
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
        (p) => p.productId === updateProduct.productId,
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
          `Product with id ${updateProduct.productId} not foundin Shopping cart`,
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
      return await this.createShoppingCart(userId, products);
    }

    try {
      const shoppingCartExist = await this.shoppingCartRepository.findOne({
        where: { shoppingCartId },
      });

      if (!shoppingCartExist) {
        throw new Error(`Shopping cart with id ${shoppingCartId} not found`);
      }
      const oldProducts: any[] = [...shoppingCartExist.products];
      const updateProducts = [...products];

      await Promise.all(
        updateProducts.map(async (updateProduct) => {
          const productIndex = oldProducts.findIndex(
            (p) => p.productId === updateProduct.productId,
          ); // procura item a ser atualizado entre os itens atuais
          if (productIndex === -1) {
            // item a ser atualizado nao existe atualmente entao sera adicionado
            const newProduct = await this.getProductById(updateProduct);
            if (newProduct) oldProducts.push(newProduct);
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
      console.error('error inside addProducts', error);
      return error;
    }
  }

  async createShoppingCart(
    userId: number,
    products: Partial<Product[]>,
  ): Promise<ShoppingCartDto> {
    const newProducts: Product[] = [];

    await Promise.all(
      products.map(async (p) => {
        const newProduct = await this.getProductById(p);
        if (newProduct) newProducts.push(newProduct);
      }),
    );

    const { totalPrice, totalQuantity } = this.getTotals(newProducts);
    const cart: Omit<ShoppingCartDto, 'shoppingCartId'> = {
      products: newProducts,
      userId,
      totalPrice,
      totalQuantity,
    };

    return this.shoppingCartRepository.save(cart);
  }
}
