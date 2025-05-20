import { HttpStatusCodes } from "../utils/constants/enums";
import { AppDataSource } from "../utils/database";

/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - General
 *     responses:
 *       200:
 *         description: Returns service health status for k8s readiness probes
 */
export const healthController =
  (container: any) => async (req: any, res: any) => {
    const isDBReady = AppDataSource.isInitialized;
    const isRedisReady = true;

    res.status(HttpStatusCodes.Ok).json({
      status: isDBReady && isRedisReady ? "ok" : "nok",
      services: {
        database: isDBReady ? "ok" : "nok",
        redis: isRedisReady ? "ok" : "nok",
      },
    });
  };
