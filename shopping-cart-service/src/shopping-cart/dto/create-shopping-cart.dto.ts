export class CreateShoppingCartDto {
  userId: string;

  totalPrice: number;

  totalQuantity: number;

  products: Array<string>;
}
