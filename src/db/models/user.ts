import { Model } from 'objection';
import Brand from './brand';
import Addon from './addon';

export default class User extends Model {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  role?: string;

  brands?: Brand[];
  addons?: Addon[];

  static tableName = 'users';

  static relationMappings = () => ({
    brands: {
      relation: Model.HasManyRelation,
      modelClass: Brand,
      join: {
        from: 'users.id',
        to: 'brands.user_id',
      },
    },
    addons: {
      relation: Model.HasManyRelation,
      modelClass: Addon,
      join: {
        from: 'users.id',
        to: 'addons.user_id',
      },
    },
  });
}
