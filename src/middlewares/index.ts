import * as cors from 'cors';
import { json, urlencoded } from 'express';

const corsMiddleware = cors({ /* cors options */ });
const jsonParserMiddleware = json({ /* json par options */ });
const urlBodyParserMiddleware = urlencoded({ extended: true });

export const middlewares = [
  corsMiddleware,
  jsonParserMiddleware,
  urlBodyParserMiddleware,
];

export {
  middlewares as default
};