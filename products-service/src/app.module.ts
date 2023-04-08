import { Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { typeOrmConfigAsync } from './database/typeorm.config';
import { ProductSeeder } from './database/seed/products.sedder';
import { ProductsEntity } from './products/entities/products.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    TypeOrmModule.forFeature([ProductsEntity]),
    ProductsModule,
  ],
  controllers: [],
  providers: [ProductSeeder],
})
export class AppModule {}
