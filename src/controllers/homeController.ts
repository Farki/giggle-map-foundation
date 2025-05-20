import config from "../config";
import packageJson from "../../package.json";
import { HttpStatusCodes } from "../utils/constants/enums";

export const homeController =
  (serviceContainer: any) => async (req: any, res: any) => {
    res.status(HttpStatusCodes.Ok).json({
      service: packageJson.name,
      environment: config.env,
      health: `http://localhost:${config.port}/health`,
      docs: `http://localhost:${config.port}/docs`,
      metrics: `http://localhost:${config.port}/metrics`,
    });
  };
