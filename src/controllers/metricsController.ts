import { Router } from "express";
import { Container } from "../container/container";
import client from "prom-client";

export const metricsController = (container: Container): Router => {
  const router = Router();

  // Collect default metrics
  client.collectDefaultMetrics();

  router.get("/", async (req, res) => {
    res.set("Content-Type", client.register.contentType);
    res.end(await client.register.metrics());
  });

  return router;
};
