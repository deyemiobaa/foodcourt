import { Model } from 'objection';
import Brand from './brand';

export default class User extends Model {
  id!: string
  name!: string
  email!: string
  password!: string
  role?: string

  static tableName = 'users';

  static relationMappings = () => ({
    brands: {
      relation: Model.HasOneRelation,
      modelClass: Brand,
      join: {
        from: 'users.id',
        to: 'brands.user_id'
      }
    }
  });
}