import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDTO } from './auto.dto';
import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(body: LoginDTO) {
    const { email, password } = body;
    const user = await this.usersService.findOne(body);
    if (user && user.password === password) {
      const payload = { email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    throw new BadRequestException('Invalid email or password.');
  }
}
