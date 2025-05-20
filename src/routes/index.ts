import { Router } from "express";
import { createV1Router } from "./v1";
import swaggerUi from "swagger-ui-express";
import { generateSwaggerDoc } from "../utils/swagger";
import { healthController } from "../controllers/healthController";
import { homeController } from "../controllers/homeController";
import { Container } from "../container/container";

export const createMainRouter = (container: Container): Router => {
  const router: Router = Router();

  router.get("/", homeController(container));
  router.get("/health", healthController(container));
  router.use("/docs", swaggerUi.serve, swaggerUi.setup(generateSwaggerDoc()));

  router.use("/v1", createV1Router(container));
  // router.use("/v2", createV2Router(container)); We can easily add version 2+

  return router;
};
