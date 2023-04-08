import {
  Controller,
  Get,
  // UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

//@ApiBearerAuth()
@ApiTags('Products')
@Controller('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  // UseGuards()
  async index() {
    return this.productsService.getProducts();
  }
}
