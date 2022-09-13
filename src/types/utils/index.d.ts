import { AbstractHttpAdapter } from '@nestjs/core';
import { Express, RequestHandler } from "express";
import { NestExpressApplication } from '@nestjs/platform-express';

export * from "./helpers";

export type NestApp = NestExpressApplication;

export interface StartNestServerProps {
  beforeStartup?: (app: NestApp) => void;
  onSuccess?: (app: NestApp, addr: string) => void;
  onError?: (err: Error) => void;
  adapter: AbstractHttpAdapter;
  port: number | string;
  host?: string;
}

export type StartNestServer = (props: StartNestServerProps) => Promise<void>;
export type InjectMiddlewares = (server: NestApp) => void;