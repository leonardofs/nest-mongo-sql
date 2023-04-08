import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

import { ProductsRepository } from './products.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsEntity } from './schema/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductsEntity.name,
        schema: ProductsEntity,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
