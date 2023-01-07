import { Model } from "objection";
import Brand from "./brand";
import User from "./user";

export default class Addon extends Model {
  id!: string;
  name!: string;
  description?: string;
  price!: number;
  category?: string;
  brandId!: string;
  userId!: string;

  static tableName = "addons";

  static relationMappings = () => ({
    brand: {
      relation: Model.BelongsToOneRelation,
      modelClass: Brand,
      join: {
        from: "addons.brand_id",
        to: "brands.id"
      }
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "addons.user_id",
        to: "users.id"
      }
    }
  });
}