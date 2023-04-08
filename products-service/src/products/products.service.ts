import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsEntity } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, IsNull, Repository } from 'typeorm';
import { ProductSeeder } from 'src/database/seed/products.sedder';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  async findAll(page?: number, limit?: number) {
    const options: FindManyOptions<ProductsEntity> = {
      where: {
        deletedAt: IsNull(),
      },
    };

    if (page && limit) {
      // optional pagination
      const skip = (page - 1) * limit;
      options.take = limit;
      options.skip = skip;
    }

    return await this.productsRepository.find(options);
  }

  async findOneOrFail(options: FindOneOptions<ProductsEntity>) {
    try {
      return await this.productsRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
