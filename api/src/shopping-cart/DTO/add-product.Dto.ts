import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class AddProductDto {
  @ApiProperty({
    description: 'ID do produto a ser adicionado',
  })
  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  readonly productId: string;

  @ApiProperty({
    description: 'Quantidade a ser adicionada',
  })
  @IsNotEmpty({ message: 'A quantidade é obrigatória' })
  @IsNumber({}, { message: 'A quantidade deve ser um número' })
  @IsPositive({ message: 'A quantidade deve ser positiva' })
  readonly quantity: number;
}
