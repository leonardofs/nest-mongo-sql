import { ShoppingCart } from '../entities/shopping-cart.entity';

export type ShoppingCartDto = Omit<
  ShoppingCart,
  'updatedAt' | 'deletedAt' | 'createdAt'
>;
