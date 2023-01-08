import { Injectable } from '@nestjs/common';
import Addon from 'src/db/models/addon';
import { AddonDTO, PatchAddonDTO } from './addon.dto';

@Injectable()
export class AddonsService {
  async createAddon(userId: string, brandId: string, body: AddonDTO) {
    const addon = await Addon.query().insert({
      ...body,
      brandId: brandId,
      userId: userId,
    });
    return addon
  }

  async getAddons(userId: string, brandId: string) {
    const addons = await Addon.query().where({
      userId,
      brandId
    })
    return addons
  }

  async getAddon(id: string, brandId: string) {
    return Addon.query().findOne({ id, brandId });
  }

  async updateAddon(id: string, brandId: string, body: Partial<PatchAddonDTO>) {
    return Addon.query()
      .patch({ ...body })
      .findOne({ id, brandId });
  }

  async deleteAddon(id: string, brandId: string) {
    return Addon.query().delete().findOne({ id, brandId });
  }
}
