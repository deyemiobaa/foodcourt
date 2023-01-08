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
import { PatchAddonDTO, AddonDTO, AddonCategoryDTO } from 'src/addons/addon.dto';
import { ApiOperation, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';


@ApiSecurity('bearer')
@Controller('brands')
@ApiTags('Brand operations')
@UseGuards(JwtAuthGuard)
export class BrandsController {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly usersService: UsersService,
  ) { }

  @Post(':brandId/addons')
  @ApiOperation({
    summary: 'End point to create an addon for a brand',
  })
  @ApiParam({
    name: 'brandId',
    description: 'Id of the brand you want to perform the operation on',
    required: true,
    type: String
  })
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


  @Get(':brandId/addons')
  @ApiOperation({
    summary: 'End point to get all addons for a brand',
  })
  @ApiParam({
    name: 'brandId',
    description: 'Id of the brand you want to perform the operation on',
    required: true,
    type: String
  })
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


  @Get('/:brandId/addons/:addonId')
  @ApiOperation({
    summary: 'End point to get an addon for a brand',
  })
  @ApiParam({
    name: 'brandId',
    description: 'Id of the brand you want to perform the operation on',
    required: true,
    type: String
  })
  @ApiParam({
    name: 'addonId',
    description: 'Id of the addon you want to get',
    required: true,
    type: String
  })
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

  @Patch('/:brandId/addons/:addonId')
  @ApiOperation({
    summary: 'End point to update properties of an addon for a brand',
  })
  @ApiParam({
    name: 'brandId',
    description: 'Id of the brand you want to perform the operation on',
    required: true,
    type: String
  })
  @ApiParam({
    name: 'addonId',
    description: 'Id of the addon you want to update',
    required: true,
    type: String
  })
  async updateAddon(
    @CurrentUser('id') userId: string,
    @Param('brandId') brandId: string,
    @Param('addonId') addonId: string,
    @Body() body: PatchAddonDTO,
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

  @Delete(':brandId/addons/:addonId')
  @ApiOperation({
    summary: 'End point to delete an addon for a brand',
  })
  @ApiParam({
    name: 'brandId',
    description: 'Id of the brand you want to perform the operation on',
    required: true,
    type: String
  })
  @ApiParam({
    name: 'addonId',
    description: 'Id of the addon you want to delete',
    required: true,
    type: String
  })
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

  @Post(':brandId/addon-categories')
  @ApiOperation({
    summary: 'End point to create an addon-category for a brand',
  })
  @ApiParam({
    name: 'brandId',
    description: 'Id of the brand you want to create a category for',
    required: true,
    type: String
  })
  async createAddonCategory(
    @CurrentUser('id') userId: string,
    @Param('brandId') brandId: string,
    @Body() body: AddonCategoryDTO,
  ) {
    const isValidRequest = await this.usersService.checkUserAndBrand(
      userId,
      brandId,
    );
    if (!isValidRequest) {
      throw new ForbiddenException();
    }

    const { name } = body;
    const newAddonCategory = await this.brandsService.createAddonCategoryForBrand(
      brandId,
      name,
    );
    return { message: newAddonCategory };
  }
}
