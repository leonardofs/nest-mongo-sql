import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsEntity } from './schema/products.schema';
import { faker } from '@faker-js/faker';
@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(ProductsEntity.name)
    private readonly productsModel: Model<ProductsEntity>,
  ) {
    this.seed();
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
  }): Promise<ProductsEntity[]> {
    const { page, limit } = options || {};

    const query = this.productsModel.find({ deletedAt: null });

    if (page && limit) {
      query.skip((page - 1) * limit).limit(limit);
    }

    return query.exec();
  }

  async findById(productId: string): Promise<ProductsEntity | null> {
    return this.productsModel
      .findOne({ _id: productId, deletedAt: null })
      .exec();
  }

  async create(product: ProductsEntity): Promise<ProductsEntity> {
    const createdProduct = new this.productsModel(product);
    return createdProduct.save();
  }

  async createMany(products: ProductsEntity[]): Promise<ProductsEntity[]> {
    return this.productsModel.create(products);
  }

  async hasAny(): Promise<boolean> {
    const count = await this.productsModel.countDocuments();
    return count > 0;
  }

  async seed(samples = 10): Promise<void> {
    const hasProducts = await this.hasAny();
    if (!hasProducts) {
      const productsToCreate = [];

      for (let i = 0; i < samples; i++) {
        const product = new ProductsEntity();

        product.name = faker.commerce.productName();
        product.description = faker.commerce.productDescription();
        product.price = Number(faker.finance.amount(0, 200, 2));

        productsToCreate.push(product);
      }
      await this.createMany(productsToCreate);
    } else {
      const logger = new Logger('Seeder');
      logger.warn('Banco já populado');
    }
  }
}
