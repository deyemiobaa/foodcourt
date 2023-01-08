import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Model } from 'objection';
import Knex from 'knex';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import knexConfig from '../knexfile';

const env = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[env]);
Model.knex(knex);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('foodcourt API')
    .setDescription('Reqests to create and manage foodcourt addons')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
