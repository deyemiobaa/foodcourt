import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema.createTable('addons', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name', 100).notNullable();
    table.integer('price').notNullable();
    table.string('description', 500);
    table.string('category');
    table
      .uuid('brand_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE');
    table
      .uuid('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');

    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('addons');
}
