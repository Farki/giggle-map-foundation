import PlaceService from "../../src/services/PlaceService/PlaceService";
import { NotFoundError } from "../../src/errors/NotFoundError";

describe("PlaceService", () => {
  let placeService: PlaceService;
  let mockLogger: any;
  let mockRepo: any;

  beforeEach(() => {
    mockLogger = { info: jest.fn(), warn: jest.fn(), error: jest.fn() };
    mockRepo = {
      createQueryBuilder: jest.fn(() => ({
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue([{}]),
      })),
      findOneBy: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    placeService = new PlaceService(mockLogger, mockRepo);
  });

  it("getPlaces returns places", async () => {
    const result = await placeService.getPlaces({ page: 1, limit: 10 });
    expect(result).toEqual([{}]);
  });

  it("findPlaceById returns place if found", async () => {
    mockRepo.findOneBy.mockResolvedValue({ id: "1" });
    const result = await placeService.findPlaceById("1");
    expect(result).toEqual({ id: "1" });
  });

  it("findPlaceById throws if not found", async () => {
    mockRepo.findOneBy.mockResolvedValue(undefined);
    await expect(placeService.findPlaceById("x")).rejects.toThrow(
      NotFoundError,
    );
  });

  it("createPlace creates and saves a place", async () => {
    const place = {
      name: "A",
      location: { type: "Point", coordinates: [1, 2] },
    };
    mockRepo.create.mockReturnValue(place);
    mockRepo.save.mockResolvedValue(place);
    const result = await placeService.createPlace({
      name: "A",
      latitude: 2,
      longitude: 1,
    });
    expect(result).toBe(place);
    expect(mockRepo.create).toHaveBeenCalled();
    expect(mockRepo.save).toHaveBeenCalledWith(place);
  });
});
