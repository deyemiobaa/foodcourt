// Update with your config settings.
import * as path from 'path';
import * as dotenv from 'dotenv';
import { knexSnakeCaseMappers } from 'objection';

dotenv.config({ path: path.join(process.cwd(), '.env') });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      user: 'postgres',
      password: process.env.DB_PASSWORD,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.join(process.cwd(), 'src/db/migrations'),
      extension: 'ts',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: path.join(process.cwd(), 'src/db/seeds'),
    },
    ...knexSnakeCaseMappers(),
  },
};
