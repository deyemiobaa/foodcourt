import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Model } from 'objection';
import Knex from 'knex';

import knexConfig from '../knexfile';

const knex = Knex(knexConfig.development);
Model.knex(knex);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
