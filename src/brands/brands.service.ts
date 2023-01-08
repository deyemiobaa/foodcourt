import { Injectable } from '@nestjs/common';
import { AddonsService } from 'src/addons/addons.service';
import Brand from 'src/db/models/brand';
import {
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { AddonDTO, PatchAddonDTO } from 'src/addons/addon.dto';
import AddonCategory from 'src/db/models/addon_category';

@Injectable()
export class BrandsService {
  constructor(private addonsService: AddonsService) {}

  async createAddonForBrand(userId: string, brandId: string, body: AddonDTO) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException();
    }
    const addon = await this.addonsService.createAddon(userId, brandId, body);
    if (!addon) {
      throw new ForbiddenException();
    }
    return `Addon: ${addon.name}, created successfully`;
  }

  async getAddonsForBrand(userId: string, brandId: string) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException();
    }
    const addons = await this.addonsService.getAddons(userId, brandId);
    return addons;
  }

  async getAddonForBrand(addonId: string, userId: string, brandId: string) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException();
    }
    const addon = await this.addonsService.getAddon(addonId, userId, brandId);
    if (!addon) {
      throw new NotFoundException();
    }
    return addon;
  }

  async updateAddonForBrand(
    addonId: string,
    userId: string,
    brandId: string,
    body: PatchAddonDTO,
  ) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException();
    }
    const addon = await this.addonsService.updateAddon(
      addonId,
      userId,
      brandId,
      body,
    );
    if (!addon) {
      throw new ForbiddenException();
    }
    return `Addon updated successfully`;
  }

  async deleteAddonForBrand(addonId: string, userId: string, brandId: string) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException();
    }
    const addon = await this.addonsService.deleteAddon(
      addonId,
      userId,
      brandId,
    );
    if (!addon) {
      throw new NotFoundException();
    }
    return `Addon deleted successfully`;
  }

  async createAddonCategoryForBrand(brandId: string, name: string) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException();
    }
    const category = await AddonCategory.query().insert({ name, brandId });
    if (!category) {
      throw new ForbiddenException();
    }
    return `Category: ${category.name}, added successfully`;
  }
}
