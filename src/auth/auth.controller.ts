import { Body, Controller, Post } from '@nestjs/common/decorators';

import { AuthService } from './auth.service';
import { LoginDTO } from './auto.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
