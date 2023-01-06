import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('brands', (table) => {
    table.uuid('id').primary();
    table.string('name', 100).notNullable();
    table.string('description', 500).notNullable();
    table.uuid('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('brands');
}

