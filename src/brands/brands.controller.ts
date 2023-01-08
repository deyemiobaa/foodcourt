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
  @Post(':brandId/addons')
  async createAddon(
    @CurrentUser('id') userId: string,
    @Param('brandId') brandId: string,
    @Body() body: AddonDTO,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      userId,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    const newAddon = await this.brandsService.createAddonForBrand(userId, brandId, body);
    return { message: newAddon };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':brandId/addons')
  async getAllAddons(
    @CurrentUser('id') userId: string,
    @Param('brandId') brandId: string,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      userId,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    const data = await this.brandsService.getAddonsForBrand(userId, brandId);
    return data
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:brandId/addons/:addonId')
  async getAddon(
    @CurrentUser('id') userId: string,
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      userId,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    return this.brandsService.getAddonForBrand(addonId, userId, brandId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:brandId/addons/:addonId')
  async updateAddon(
    @CurrentUser('id') userId: string,
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
    @Body() body: Partial<PatchAddonDTO>,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      userId,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    const updateAddon = await this.brandsService.updateAddonForBrand(
      addonId,
      userId,
      brandId,
      body,
    );
    return { message: updateAddon };
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':brandId/addons/:addonId')
  async deleteAddon(
    @CurrentUser('id') userId: string,
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      userId,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    const deleteAddon = await this.brandsService.deleteAddonForBrand(
      addonId,
      userId,
      brandId,
    );
    return { message: deleteAddon };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':brandId/addon-categories')
  async createAddonCategory(
    @CurrentUser('id') userId: string,
    @Param('brandId') brandId: string,
    @Body('name') name: string,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      userId,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }
    
    const newAddonCategory = await this.brandsService.createAddonCategoryForBrand(
      brandId,
      name,
    );
    return { message: newAddonCategory };
  }
}
