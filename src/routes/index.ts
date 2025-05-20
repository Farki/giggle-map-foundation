import { Router } from "express";
import { createV1Router } from "./v1";
import { healthController } from "../controllers/healthController";
import { homeController } from "../controllers/homeController";
import { Container } from "../container/container";
import { docsController } from "../controllers/docsController";
import { metricsController } from "../controllers/metricsController";

export const createMainRouter = (container: Container): Router => {
  const router: Router = Router();

  router.get("/", homeController(container));
  router.get("/health", healthController(container));
  router.use("/docs", docsController(container));
  router.use("/metrics", metricsController(container));

  router.use("/v1", createV1Router(container));
  // router.use("/v2", createV2Router(container)); We can easily add version 2+

  return router;
};
