import * as functions from "firebase-functions";

import * as express from 'express';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MossemAppModule } from './mossem-app.module';
import { ExpressAdapter } from "@nestjs/platform-express";

const expressServer = express();

async function bootstrap(expressInstance:any) {
  const app = await NestFactory.create(MossemAppModule, new ExpressAdapter(expressInstance));
  const config = new DocumentBuilder()
    .addServer("https://asia-northeast1-mossem.cloudfunctions.net/restapi")
    .addServer("/mossem/asia-northeast1/restapi")
    .setTitle('ITSMarawi Mossem API')
    .setDescription('REST API for ITSMarawi Mossem')
    .setVersion('1.0')
    .addTag('food mossem')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.enableCors({
    "origin":true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "credentials":true
  });
  await app.init();
}

export const restapi = functions.region('asia-northeast1').https.onRequest(async (request, response) => {
    await bootstrap(expressServer);
    expressServer(request, response);
});
