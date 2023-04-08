import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class IndexProductsDto {
  @ApiProperty({
    example: 1,
    description: 'database generated and auto increment',
  })
  productId: string;

  @ApiProperty({ nullable: false, example: faker.commerce.productName() })
  name: string;

  @ApiProperty({ example: faker.commerce.productDescription(), nullable: true })
  description?: string;

  @ApiProperty({ nullable: false, example: faker.finance.amount(0, 200, 2) })
  price: number;
}
