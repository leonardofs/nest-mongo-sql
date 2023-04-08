import {
  Controller,
  Get,
  // UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { IndexProductsDto } from './DTO/index-products.dto';
import { Observable } from 'rxjs';

//@ApiBearerAuth()
@ApiTags('Products')
@Controller('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiResponse({ status: '2XX', description: 'Retorna a lista de produtos' })
  // UseGuards()
  async index(): Promise<Observable<IndexProductsDto[]>> {
    return this.productsService.getProducts();
  }
}
