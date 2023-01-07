import { AuthGuard } from '@nestjs/passport';
import { BrandsService } from './brands.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';

@Controller('brands')
export class BrandsController {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly usersService: UsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post(':brandId/addons:')
  async createAddon(
    @CurrentUser('id') id: string,
    @Param('brandId') brandId: string,
    @Body('name') addonName: string,
    @Body('description') addonDescription: string,
    @Body('price') addonPrice: number,
    @Body('category') addonCategory: string,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(id, brandId);
    if (isValidRequest) {
      const newAddon = this.brandsService.createAddonForBrand(
        id,
        brandId,
        {
          name: addonName,
          description: addonDescription,
          price: addonPrice,
          category: addonCategory,
        }
      );
      return { message: newAddon };
    }
  }

  // @Get()
  // getAllAddons() {
  //   return this.brandsService.getAddonsForBrand();
  // }

  // @Get(':addonId')
  // getAddon(@Param('addonId') addonId: string) {
  //   return this.brandsService.getAddonForBrand(addonId);
  // }

  // @Patch(':addonId')
  // updateAddon(
  //   @Param('addonId') addonId: string,
  //   @Body('name') name: string,
  //   @Body('description') description: string,
  //   @Body('price') price: number,
  //   @Body('category') category: string,
  // ) {
  //   return this.brandsService.updateAddonForBrand(
  //     addonId,
  //     name,
  //     description,
  //     price,
  //     category,
  //   );
  // }

  // @Delete(':addonId')
  // deleteAddon(@Param('addonId') addonId: string) {
  //   return this.brandsService.deleteAddonForBrand(addonId);
  // }
}
