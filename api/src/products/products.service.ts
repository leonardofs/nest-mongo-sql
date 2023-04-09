import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ProductDto } from './DTO/product.dto';
@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}

  getProducts() {
    return this.productsClient.send<ProductDto[]>({ cmd: 'get-products' }, {});
  }

  getbyId(productId: number) {
    return this.productsClient.send<ProductDto[]>(
      { cmd: 'get-by-id' },
      { productId },
    );
  }
}
