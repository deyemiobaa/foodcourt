import { BrandsService } from './brands.service';
import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtAuthGuard } from 'src/auth/guard/auth.guard';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { PatchAddonDTO, AddonDTO } from 'src/addons/addon.dto';
@Controller('brands')
export class BrandsController {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':brandId/addons:')
  async createAddon(
    @CurrentUser('id') id: string,
    @Param('brandId') brandId: string,
    @Body() body: AddonDTO,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      id,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    const newAddon = this.brandsService.createAddonForBrand(id, brandId, body);
    return { message: newAddon };
  }

  @Get(':brandId/addons')
  async getAllAddons(
    @CurrentUser('id') id: string,
    @Param('brandId') brandId: string,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      id,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    const data = this.brandsService.getAddonsForBrand(brandId);
    return { data };
  }

  @Get('/:brandId/addons/:addonId:')
  async getAddon(
    @CurrentUser('id') id: string,
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      id,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    return this.brandsService.getAddonForBrand(brandId, addonId);
  }

  @Patch('/:brandId/addons/:addonId:')
  async updateAddon(
    @CurrentUser('id') id: string,
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
    @Body() body: Partial<PatchAddonDTO>,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      id,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    const updateAddon = this.brandsService.updateAddonForBrand(
      brandId,
      addonId,
      body,
    );
    return { message: updateAddon };
  }

  @Delete(':brandId/addons/:addonId')
  async deleteAddon(
    @CurrentUser('id') id: string,
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      id,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    const deleteAddon = this.brandsService.deleteAddonForBrand(
      brandId,
      addonId,
    );
    return { message: deleteAddon };
  }

  @Post(':brandId/addon-categories')
  async createAddonCategory(
    @CurrentUser('id') id: string,
    @Param('brandId') brandId: string,
    @Body('name') name: string,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      id,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    const newAddonCategory = this.brandsService.createAddonCategoryForBrand(
      name,
      brandId,
    );
    return { message: newAddonCategory };
  }
}
