import { ApiProperty } from '@nestjs/swagger';
import { faker } from '@faker-js/faker';

export class IndexProductsDto {
  @ApiProperty({
    example: 1,
    description: 'database generated and auto increment',
  })
  id: string;

  @ApiProperty({ example: faker.commerce.productName() })
  name: string;

  @ApiProperty({ example: faker.commerce.productDescription(), nullable: true })
  description?: string;

  @ApiProperty({ nullable: false, example: faker.commerce.price() })
  price: number;
}
