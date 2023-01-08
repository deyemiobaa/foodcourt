# FoodCourt API
API to manage meal addons for the brands on the FoodCourt platform.

## Tools
- [NestJS](https://nestjs.com/)
- [Knex](http://knexjs.org/)
- [Objection](https://vincit.github.io/objection.js/)
- [Typescript](https://www.typescriptlang.org/)
  
## Installation

```bash
$ yarn install
```

## Setup
  
- Create a `.env` file in the root directory of the project and add keys from the `.env.example` file. 
- A databese user `postgres` was set in `Knexfile.ts`. You can change this to your preferred database user. Create a database with the name `foodcourt` and update the `env` accordingly.
  
## Migrations

Run the following command to run migrations:

```bash
npm run migrate
```

## Seeding

Run the following command to seed the database:

```bash
npm run seed
```
## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

Head on to `http://localhost:3000/api` to view the API documentation.

## Testing the app

In `src/db/seeds/demo.ts` you can find the seed data for the database. Running the seed command will create a user and brand for you to use for testing. 

Use the credentials to test the endpoints.


## Improvements

- Writing tests to cover the app
- Using nestjs authorization module to handle authorization (currently using a query to check users role)

## Stay in touch

- Author - [Sodiq A.](https://www.linkedin.com/in/sodiqa/)
- Twitter - [@deyemiobaa](https://twitter.com/deyemiobaa)

## License

[MIT licensed](LICENSE).
