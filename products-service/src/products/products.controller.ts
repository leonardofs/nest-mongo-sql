import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductDto } from './products.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'get-products' })
  async getProducts(): Promise<ProductDto[]> {
    return await this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'get-by-id' })
  async getById(@Payload() productId: string): Promise<ProductDto> {
    return await this.productsService.findById(productId);
  }
}
