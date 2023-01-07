import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('addon_categories', (table) => {
    table.uuid('id').primary();
    table.string('name', 100).notNullable();
    table
      .uuid('brand_id')
      .notNullable()
      .references('id')
      .inTable('brands')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('addon_categories');
}
