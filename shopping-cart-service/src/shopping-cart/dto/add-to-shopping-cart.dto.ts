import { ShoppingCartDto } from './shopping-cart.dto';

export type addToShoppingCartDto = Omit<
  ShoppingCartDto,
  'userId' | 'totalPrice' | 'totalQuantity'
>;
