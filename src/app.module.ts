import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BrandsController } from './brands/brands.controller';
import { BrandsModule } from './brands/brands.module';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig]
    }),
    AuthModule,
    UsersModule,
    BrandsModule
  ],
  controllers: [AppController, BrandsController],
  providers: [AppService],
})
export class AppModule {}
