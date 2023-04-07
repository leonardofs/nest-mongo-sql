import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsEntity } from './entities/products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  async findAll() {
    return 'chegou ao findAll';
    // TODO deixar apenas metodo
    //return await this.productsRepository.find();
  }

  async findOneOrFail(options: FindOneOptions<ProductsEntity>) {
    try {
      return await this.productsRepository.findOneOrFail(options);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
