// Update with your config settings.
import * as path from 'path';
import * as dotenv from 'dotenv';
import { knexSnakeCaseMappers } from 'objection';

dotenv.config({ path: path.join(process.cwd(), '.env') });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

const config: { [s: string]: import("knex").Knex.Config; } = {
  development: {
    client: 'postgresql',
    connection: {
      port: 5432,
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

export default config;
