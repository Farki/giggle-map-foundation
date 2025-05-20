import { Logger } from "winston";
import PlaceService from "../PlaceService/PlaceService";
import RouteService from "./RouteService";

export default function createRouteService(
  logger: Logger,
  placeService: PlaceService,
): RouteService {
  return new RouteService(logger, placeService);
}
