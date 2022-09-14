export * from "./uuid";
export * from "./helpers";
export * from "./hasher";

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '../app.module';
import { middlewares } from "../middlewares";
import { AllExceptionsFilter } from './nestjs/filters';
import { ValidationPipeConfig } from '../configs';
import { StartNestServer, InjectMiddlewares } from '../types';


export const startNestServer: StartNestServer = async (props) => {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, props.adapter);

    props.beforeStartup?.(app);
    await app.listen(props.port, props.host);
    props.onSuccess?.(app, await app.getUrl());

  } catch (error) {
    props.onError?.(error);
  }
};

export const injectMiddlewares: InjectMiddlewares = (server) => {
  server.use(...middlewares);
  server.disable("x-powered-by");
  server.useGlobalPipes(new ValidationPipe(ValidationPipeConfig));
  server.useGlobalFilters(new AllExceptionsFilter());
};