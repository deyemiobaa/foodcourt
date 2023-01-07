import { Knex } from 'knex';

exports.seed = async function (knex: Knex): Promise<any> {
  await knex.raw('TRUNCATE TABLE users CASCADE');
  await knex.raw('TRUNCATE TABLE brands CASCADE');

  // Inserts seed entries
  await knex('users').insert([
    {
      id: '3d9a1f8b-96b9-4749-98e8-d8bbb7cd5df1',
      name: 'John',
      email: 'john@example.com',
      password: 'password',
      role: 'admin',
    },
    {
      id: 'a9c8925c-1a67-44d5-94e8-77a2b7f5e5f5',
      name: 'Jane',
      email: 'jane@example.com',
      password: 'password',
    },
  ]);

  await knex('brands').insert([
    {
      id: '8b91e3a7-9a9f-4e13-a17a-097c9bcc6c12',
      name: 'Jollof & Co',
      description:
        'Experience Jollof in all its splendor! From the beloved smokey jollof rice to pasta, Asaro and much more we promise you a lunch full of relish! Exclusively on FoodCourt.',
      user_id: '3d9a1f8b-96b9-4749-98e8-d8bbb7cd5df1',
    },
  ]);
};
