import PlaceService from "./PlaceService";
import { Logger } from "winston";
import { Place } from "../../entities/Place";
import { Repository } from "typeorm";

export default function createPlaceService(
  logger: Logger,
  placeRepository: Repository<Place>,
): PlaceService {
  return new PlaceService(logger, placeRepository);
}
