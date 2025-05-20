import { Logger } from "winston";
import { getLogger } from "../utils/logger";
import createPlaceService from "../services/PlaceService";
import PlaceService from "../services/PlaceService/PlaceService";
import { AppDataSource } from "../utils/database";
import { Place } from "../entities/Place";
import RouteService from "../services/RouteService/RouteService";
import createRouteService from "../services/RouteService";

export interface Container {
  logger: Logger;
  placeService: PlaceService;
  routeService: RouteService;
}

let containerInstance: Container | null = null;

/**
 * Creates a singleton DI container.
 */
export const createContainer = (): Container => {
  if (containerInstance) {
    return containerInstance;
  }

  const logger = getLogger();

  const placeRepository = AppDataSource.getRepository(Place);
  const placeService = createPlaceService(logger, placeRepository);
  const routeService = createRouteService(logger, placeService);

  return { logger, placeService, routeService };
};
