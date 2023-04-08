import { IsNull, Repository } from 'typeorm';
import { ProductsEntity } from '../../products/entities/products.entity';
import { faker } from '@faker-js/faker';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductSeeder {
  productRepository = null;
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  async run(samples = 10): Promise<void> {
    const productExists = await this.productsRepository.count({
      where: {
        deletedAt: IsNull(),
      },
    });

    if (productExists === 0) {
      const products = [];

      for (let i = 0; i < samples; i++) {
        const product = new ProductsEntity();

        product.name = faker.commerce.productName();
        product.description = faker.commerce.productDescription();
        product.price = Number(faker.commerce.price());

        products.push(product);
      }
      await this.productsRepository.save(products);
    } else {
      const logger = new Logger('Seeder');
      logger.warn('Banco já populado');
    }
  }
}
