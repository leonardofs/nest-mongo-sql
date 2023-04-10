import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({
    description: 'Endereço de email do usuário',
    example: 'usuario@exemplo.com',
  })
  @IsEmail({}, { message: 'O endereço de email fornecido não é válido' })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'mypassword',
  })
  @IsString({ message: 'A senha deve ser uma string' })
  password: string;
}
