import { Model } from 'objection';
import User from './user';
import Addon from './addon';
import AddonCategory from './addon_category';

export default class Brand extends Model {
  id!: string;
  name!: string;
  description!: string;
  userId!: string;

  addons?: Addon[];
  addonCategories?: AddonCategory[];

  static tableName = 'brands';

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'brands.user_id',
        to: 'users.id',
      },
    },
    addons: {
      relation: Model.HasManyRelation,
      modelClass: Addon,
      join: {
        from: 'brands.id',
        to: 'addons.brand_id',
      },
    },
    addonCategories: {
      relation: Model.HasManyRelation,
      modelClass: AddonCategory,
      join: {
        from: 'brands.id',
        to: 'addon_categories.brand_id',
      },
    },
  });
}
