import express, { urlencoded } from "express";
import { Application } from "express";
import * as bodyParser from "body-parser";
import cors from "cors";
import config from "./config";
import { createMainRouter } from "./routes";
import errorHandler from "./middlewares/errorHandler";
import { createContainer } from "./container/container";
import { initializeDatabase } from "./utils/database";

const app: Application = express();

(async () => {
  await initializeDatabase();

  app
    .disable("x-powered-by")
    .use(cors({ origin: config.corsUrl, optionsSuccessStatus: 200 }))
    .use(urlencoded({ extended: true }))
    .use(bodyParser.json());

  const container = createContainer();
  app.use(createMainRouter(container));
  app.use(errorHandler);
})();

export default app;
