import { Module } from '@nestjs/common';
import { BrandsService } from './brands.service';
import { AddonsModule } from 'src/addons/addons.module';
import { BrandsController } from './brands.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AddonsModule, UsersModule],
  providers: [BrandsService],
  controllers: [BrandsController],
})
export class BrandsModule {}
