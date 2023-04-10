import {
  Controller,
  Get,
  ServiceUnavailableException,
  // UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiTags, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ProductDto } from './DTO/product.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@ApiTags('Products')
@Controller('Products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Retorna a lista de produtos',
  })
  @IsPublic()
  @ApiOkResponse({
    type: [ProductDto],
    description: 'Retorna a lista de produtos',
  })
  async index() {
    try {
      return await this.productsService.getProducts();
    } catch (error) {
      throw new ServiceUnavailableException('O serviço não respondeu a tempo');
    }
  }
}
