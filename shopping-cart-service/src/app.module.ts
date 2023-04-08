import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';

@Module({
  imports: [ShoppingCartModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
