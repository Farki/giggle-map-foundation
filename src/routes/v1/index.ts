import { Router } from "express";
import { Container } from "../../container/container";
import placesController from "../../controllers/v1/placesController";
import routesController from "../../controllers/v1/routesController";

export const createV1Router = (container: Container): Router => {
  const router: Router = Router();

  router.use("/places", placesController(container));
  router.use("/routes", routesController(container));

  return router;
};
