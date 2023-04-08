import { Module } from '@nestjs/common';
import { ShoppingCartModule } from './shopping-cart/shopping-cart.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfigAsync } from './typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
    ShoppingCartModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
