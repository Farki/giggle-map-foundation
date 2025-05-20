import { HttpStatusCodes } from "../utils/constants/enums";
import { AppDataSource } from "../utils/database";

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
