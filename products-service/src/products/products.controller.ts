import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsEntity } from './entities/products.entity';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get-products' })
  async getProducts(): Promise<string | ProductsEntity[]> {
    // TODO REMOVER STRING
    return await this.productsService.findAll();
  }
}
