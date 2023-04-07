import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsController } from './products/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsEntity } from './products/entities/products.entity';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'kuantokusta',
      password: process.env.POSTGRES_PASSWORD || 'kuantokusta',
      database: process.env.POSTGRES_DB || 'kuantokusta',
      entities: [ProductsEntity],
      synchronize: true,
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
