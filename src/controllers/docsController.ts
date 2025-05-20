import path from "path";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import { Router } from "express";
import { Container } from "../container/container";

export const docsController = (container: Container): Router => {
  const router = Router();

  const openapiPath = path.join(__dirname, "../docs/openapi.yaml");
  const openapiSpec = fs.readFileSync(openapiPath, "utf8");
  const swaggerSpec = yaml.load(openapiSpec);

  router.use(swaggerUi.serve);
  router.get(
    "/",
    swaggerUi.setup(undefined, { swaggerOptions: { spec: swaggerSpec } }),
  );

  return router;
};
