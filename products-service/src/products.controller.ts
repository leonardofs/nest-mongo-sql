import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsEntity } from './entities/products.entity';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getProducts(): Promise<string | ProductsEntity []> { // TODO REMOVER STRING
    return await this.productsService.findAll();
   
  }


}
