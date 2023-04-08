import {
  Controller,
  Get,
  // UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  // UseGuards()
  async index() {
    return this.productsService.getProducts();
  }
}
