import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/authRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserToken } from './models/UserToken';
import { AuthDto } from './models/auth.dto';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiBody({
    type: AuthDto,
    description: 'Usuario e senha de exemplos funcionam para teste',
  })
  @ApiOperation({ summary: 'Realiza o login de um usuário' })
  @ApiOkResponse({
    type: UserToken,
    description: 'Retorna um  token jwt',
  })
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
}
