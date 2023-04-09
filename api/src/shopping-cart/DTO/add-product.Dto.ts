import { ApiProperty } from '@nestjs/swagger';

export class AddProductDto {
  @ApiProperty()
  readonly productId: string;

  @ApiProperty()
  readonly quantity: number;
}
