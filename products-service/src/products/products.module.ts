import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsEntity } from './entities/products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
