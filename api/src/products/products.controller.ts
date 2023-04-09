import {
  Controller,
  Get,
  // UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ProductDto } from './DTO/product.dto';
import { Observable } from 'rxjs';

//@ApiBearerAuth()
@ApiTags('Products')
@Controller('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  //@ApiBearerAuth()
  @ApiOperation({
    summary: 'Retorna a lista de produtos',
  })
  @ApiOkResponse({
    type: [ProductDto],
    description: 'Retorna a lista de produtos',
  })
  // UseGuards()
  async index(): Promise<Observable<ProductDto[]>> {
    return this.productsService.getProducts();
  }
}
