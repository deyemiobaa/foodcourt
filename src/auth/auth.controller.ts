import { Body, Controller, Post, HttpCode } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { LoginDTO } from './auth.dto';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
