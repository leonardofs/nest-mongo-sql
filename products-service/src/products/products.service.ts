import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Product, ProductDocument } from './schema/products.schema';
import { faker } from '@faker-js/faker';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { ProductDto } from './products.dto';

@Injectable()
export class ProductsService {
  private readonly productModel: Model<ProductDocument>;
  private readonly logger: Logger;

  constructor(
    @InjectModel(Product.name) private readonly model: Model<ProductDocument>,
  ) {
    this.productModel = model;
    this.logger = new Logger('ProductRepository');
  }

  mapToDto(product: Product): ProductDto {
    const { _id, price, name, description } = product;
    return { productId: _id, price, name, description } as ProductDto;
  }

  async findAll(options?: {
    page?: number;
    limit?: number;
  }): Promise<ProductDto[]> {
    const { page, limit } = options || {};

    const query = this.productModel.find({ deletedAt: null });

    if (page && limit) {
      query.skip((page - 1) * limit).limit(limit);
    }

    const products = await query.exec();

    return products.map(this.mapToDto);
  }

  async findById(productId: string): Promise<ProductDto> {
    try {
      const product = await this.productModel
        .findOne({ _id: productId })
        .exec();

      if (!product) {
        return null;
      }

      return this.mapToDto(product);
    } catch (error) {
      console.error(error);
      throw new NotFoundException('serviço de produtos indisponivel');
    }
  }

  async create(product: Product): Promise<Product> {
    const createdProduct = new this.productModel(product);
    return createdProduct.save();
  }

  async createMany(products: Product[]): Promise<Product[]> {
    try {
      return this.productModel.create(products);
    } catch (error) {
      console.error(error);
    }
  }

  async hasAny(): Promise<boolean> {
    const count = await this.productModel.countDocuments();
    return count > 0;
  }

  async seed(samples = 10): Promise<void> {
    const hasProducts = await this.hasAny();
    const logger = new Logger('Seeder');
    if (!hasProducts) {
      const productsToCreate: Product[] = [];
      logger.warn('Populando o banco');

      for (let i = 0; i < samples; i++) {
        const product = new this.productModel({
          name: faker.commerce.productName(),
          description: faker.commerce.productDescription(),
          price: Number(faker.finance.amount(0, 200, 2)),
        });
        productsToCreate.push(product);
      }
      await this.productModel.insertMany(productsToCreate);
    } else {
      logger.warn('Banco já populado');
    }
  }
}
