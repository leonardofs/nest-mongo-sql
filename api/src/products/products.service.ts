import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class ProductsService {

    constructor ( @Inject('PRODUCTS_SERVICE') private readonly productsClient: ClientProxy) {}
      //  @Inject('SHOPPINGCART') private readonly ShoppingCartClient: ShoppingCartProxy,
    

      getProducts(): Observable<Array<any>> { // todo create ProductsModel
        return this.productsClient.send({ }, {});
      }


}
