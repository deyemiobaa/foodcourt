import { Model } from 'objection';
import User from './user';

export default class Brand extends Model {
  id!: string
  name!: string
  description!: string
  userId!: string


  static tableName = 'brands';

  static relationMappings = () => ({
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'brands.user_id',
        to: 'users.id'
      }
    }
  });
}