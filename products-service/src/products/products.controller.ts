import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern } from '@nestjs/microservices';
import { ProductDto } from './products.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get-products' })
  async getProducts(): Promise<ProductDto[]> {
    return await this.productsService.findAll();
  }
}
