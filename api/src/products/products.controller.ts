import {
  Controller,
  Get,
  Res,
  ServiceUnavailableException,
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
import { NotFoundError, Observable } from 'rxjs';
import { Response } from 'express';

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
  async index() {
    try {
      return await this.productsService.getProducts();
    } catch (error) {
      throw new ServiceUnavailableException('O serviço não respondeu a tempo');
    }
  }
}
