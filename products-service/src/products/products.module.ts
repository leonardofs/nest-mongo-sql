import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsEntity } from './entities/products.entity';
import { ProductSeeder } from 'src/database/seed/products.sedder';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductSeeder],
})
export class ProductsModule implements OnModuleInit {
  constructor(private readonly productSeeder: ProductSeeder) {}
  onModuleInit() {
    this.productSeeder.run();
  }
}
