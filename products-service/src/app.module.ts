import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      'mongodb://root:kuantokusta@localhost:27017/kuantokusta',
    ),
    //TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    //TypeOrmModule.forFeature([ProductsEntity]),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
