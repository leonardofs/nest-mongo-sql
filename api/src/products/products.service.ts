import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { IndexProductsDto } from './DTO/index-products.dto';
@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy,
  ) {}
  //  @Inject('SHOPPINGCART') private readonly ShoppingCartClient: ShoppingCartProxy,

  getProducts(): Observable<IndexProductsDto> {
    // todo create ProductsModel
    return this.productsClient.send({ cmd: 'get-products' }, {});
  }
}
