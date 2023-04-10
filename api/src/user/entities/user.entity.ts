import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    description: 'ID do usuário',
    example: 1,
    required: false,
  })
  id?: number;

  @ApiProperty({
    description: 'Endereço de e-mail do usuário',
    example: 'user@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'mypassword',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe',
  })
  @IsNotEmpty()
  name: string;
}
