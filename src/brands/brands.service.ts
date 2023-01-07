import { Injectable } from '@nestjs/common';
import { AddonsService } from 'src/addons/addons.service';
import Brand from 'src/db/models/brand';
import { NotFoundException, ForbiddenException } from '@nestjs/common/exceptions'
import { AddonDTO, PatchAddonDTO } from 'src/addons/addon.dto';

@Injectable()
export class BrandsService {
  constructor(private addonsService: AddonsService) { }

  async createAddonForBrand(userId: string, brandId: string, body: AddonDTO) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException()
    }
    const addon = await this.addonsService.createAddon(userId, brandId, body);
    if (!addon) {
      throw new ForbiddenException()
    }
    return `Addon: ${addon.name}, created successfully`;
  }

  async getAddonsForBrand(brandId: string) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException()
    }
    const addon = await this.addonsService.getAddons(brandId);
    return addon;
  }

  async getAddonForBrand(brandId: string, addonId: string) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException()
    }
    const addon = await this.addonsService.getAddon(addonId, brandId);
    if (!addon) {
      throw new NotFoundException()
    }
    return addon;
  }

  async updateAddonForBrand(brandId: string, addonId: string, body: PatchAddonDTO) {
    const brand = await Brand.query().findById(brandId);
    if (!brand) {
      throw new NotFoundException()
    }
    const addon = await this.addonsService.updateAddon(addonId, brandId, body);
    if (!addon) {
      throw new ForbiddenException()
    }
    return addon;
  }

  async deleteAddonForBrand(brandId: string, addonId: string) {
    const brand = await Brand.query().findById(brandId)
    if (!brand) {
      throw new NotFoundException()
    }
    const addon = await this.addonsService.deleteAddon(addonId, brandId);
    if (!addon) {
      throw new ForbiddenException()
    }
    return addon;
  }
}
