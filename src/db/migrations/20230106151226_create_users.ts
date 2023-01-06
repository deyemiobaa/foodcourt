import { Knex } from 'knex';

exports.up = async function (knex: Knex): Promise<any> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('role').notNullable().defaultTo('user');
    table.timestamps(true, true);
  });
};

exports.down = async function (knex: Knex): Promise<any> {
  return knex.schema.dropTableIfExists('users');
};
