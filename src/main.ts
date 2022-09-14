import * as utils from "./utils";
import * as express from 'express';
import * as expressPlatform from '@nestjs/platform-express';

const server = express();
const adapter = new expressPlatform.ExpressAdapter(server);

utils.startNestServer({
  beforeStartup: (app) => utils.injectMiddlewares(app),
  onSuccess: (app, addr) => console.log(`server started ⚡⚡, listening on ${addr}`),
  onError: (err) => console.log("error occured starting server", err),
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 4000,
  adapter,
});