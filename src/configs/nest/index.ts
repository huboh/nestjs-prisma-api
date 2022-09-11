import { ConfigModuleOptions } from '@nestjs/config';
import { ValidationPipeOptions } from '@nestjs/common';

export const ValidationPipeConfig: ValidationPipeOptions = {
  disableErrorMessages: false,
  whitelist: true,
  transform: true,
};

export const configModuleConfig: ConfigModuleOptions = {
  isGlobal: true,
  cache: true,
};