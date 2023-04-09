import { Module } from '@nestjs/common';
import { ShoppingCartController } from './shopping-cart.controller';
import { ShoppingCartService } from './shopping-cart.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

const port = 10422;
const isDocker = process.env.NODE_ENV === 'docker';
const host = isDocker ? process.env.SHOPPING_CART_DNS : 'localhost';
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'SHOPPING_CART_SERVICE',
        transport: Transport.TCP,
        options: { host, port },
      },
    ]),
  ],
  controllers: [ShoppingCartController],
  providers: [ShoppingCartService],
})
export class ShoppingCartModule {}
