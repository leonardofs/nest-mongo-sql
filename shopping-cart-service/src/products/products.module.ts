import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

const port = 10421;
const isDocker = process.env.NODE_ENV === 'docker';
const host = isDocker ? process.env.PRODUCTS_DNS : 'localhost';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCTS_SERVICE',
        transport: Transport.TCP,
        options: { host, port },
      },
    ]),
  ],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
