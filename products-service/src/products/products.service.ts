import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsEntity } from './schema/products.schema';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async findAll(page?: number, limit?: number): Promise<ProductsEntity[]> {
    const options = {
      page,
      limit,
    };
    return this.productsRepository.findAll(options);
  }

  async findById(productId: string): Promise<ProductsEntity> {
    const product = await this.productsRepository.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }
}
