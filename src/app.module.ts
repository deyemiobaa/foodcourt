import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { BrandsModule } from './brands/brands.module';
import { AddonsModule } from './addons/addons.module';
import jwtConfig from './config/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    AuthModule,
    UsersModule,
    BrandsModule,
    AddonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
