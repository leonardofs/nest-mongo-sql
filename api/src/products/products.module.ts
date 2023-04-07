import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options : {
          port: 8081
        }
      }
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
