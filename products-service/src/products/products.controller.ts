import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsEntity } from './schema/products.schema';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get-products' })
  async getProducts(): Promise<ProductsEntity[]> {
    return await this.productsService.findAll();
  }
}
