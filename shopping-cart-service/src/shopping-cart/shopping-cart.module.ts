import { Module } from '@nestjs/common';
import { ShoppingCartService } from './shopping-cart.service';
import { ShoppingCartController } from './shopping-cart.controller';
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
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
