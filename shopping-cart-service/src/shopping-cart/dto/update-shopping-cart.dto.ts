import { ShoppingCartDto } from './shopping-cart.dto';

export type updateShoppingCartDto = Omit<
  ShoppingCartDto,
  'userId' | 'totalPrice' | 'totalQuantity'
>;
