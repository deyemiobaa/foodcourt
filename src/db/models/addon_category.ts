import { Model } from 'objection';
import Brand from './brand';

export default class AddonCategory extends Model {
  id!: string;
  name!: string;
  brandId!: string;

  static tableName = 'addon_categories';

  static relationMappings = () => ({
    brand: {
      relation: Model.BelongsToOneRelation,
      modelClass: Brand,
      join: {
        from: 'addon_categories.brand_id',
        to: 'brands.id',
      },
    },
  });
}
