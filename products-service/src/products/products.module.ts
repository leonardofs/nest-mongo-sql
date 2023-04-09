import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductsSchema } from './schema/products.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductsSchema,
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule implements OnModuleInit {
  constructor(private readonly productsService: ProductsService) {}
  onModuleInit() {
    this.productsService.seed();
  }
}
