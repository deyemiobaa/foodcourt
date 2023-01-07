import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtSignOptions } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { ConfigService } from '@nestjs/config';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('jwt.secret'),
        signOptions: config.get<JwtSignOptions>('jwt.options'),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
