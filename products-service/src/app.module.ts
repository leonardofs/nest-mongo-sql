import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      dbName: `kuantokusta`,
    }),
    ProductsModule,
  ],
  controllers: [],
  providers: [],
  exports: [MongooseModule],
})
export class AppModule {}
