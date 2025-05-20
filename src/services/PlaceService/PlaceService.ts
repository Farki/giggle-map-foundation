import { Repository } from "typeorm";
import { Place } from "../../entities/Place";
import { Logger } from "winston";
import { NotFoundError } from "../../errors/NotFoundError";

export default class PlaceService {
  constructor(
    private readonly logger: Logger,
    private readonly placeRepository: Repository<Place>,
  ) {}

  public async getPlaces(options: any): Promise<Place[]> {
    const { page, limit = 1000 } = options;

    const query = this.placeRepository.createQueryBuilder("place");

    query.skip((page - 1) * limit).take(limit);

    return query.getMany();
  }

  public async findPlaceById(id: string): Promise<Place> {
    const place = await this.placeRepository.findOneBy({ id });
    if (!place) {
      throw new NotFoundError(`Place with id ${id} not found`);
    }
    return place;
  }
  public async createPlace({
    name,
    longitude,
    latitude,
  }: {
    name: string;
    latitude: number;
    longitude: number;
  }): Promise<Place> {
    const newPlace = this.placeRepository.create({
      name,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
    });
    return this.placeRepository.save(newPlace);
  }

  public async updatePlace(
    id: string,
    {
      name,
      latitude,
      longitude,
    }: {
      name: string;
      latitude: number;
      longitude: number;
    },
  ): Promise<Place | null> {
    const place = await this.placeRepository.findOneBy({ id });
    if (!place) {
      return null;
    }

    place.name = name;
    place.location = {
      type: "Point",
      coordinates: [longitude, latitude],
    };

    return this.placeRepository.save(place);
  }

  public async getPlacesNearby(
    lat: number,
    lng: number,
    radiusKm: number,
  ): Promise<Place[]> {
    const radiusDeg = radiusKm / 111; // Approx conversion from km to degrees

    return this.placeRepository
      .createQueryBuilder("place")
      .where("ABS(place.latitude - :lat) <= :radiusDeg", { lat, radiusDeg })
      .andWhere("ABS(place.longitude - :lng) <= :radiusDeg", { lng, radiusDeg })
      .getMany();
  }
}
