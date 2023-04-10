import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ProductDto } from './DTO/product.dto';
import { firstValueFrom, timeout } from 'rxjs';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}
  async getProducts() {
    const products$ = this.productsClient
      .send({ cmd: 'get-products' }, {})
      .pipe(timeout(5000));

    if (!products$) {
      throw new NotFoundException('Not is possible get products');
    }
    return await firstValueFrom(products$);
  }
  getbyId(productId: number) {
    const product = this.productsClient
      .send<ProductDto[]>({ cmd: 'get-by-id' }, { productId })
      .pipe(timeout(5000));
    if (!product) {
      throw new NotFoundException(
        `Not is possible get product with id ${productId}}`,
      );
    }
    return product;
  }
}
