import RouteService from "../../src/services/RouteService/RouteService";
import { TravelMode } from "../../src/utils/constants/enums";

describe("RouteService", () => {
  let routeService: RouteService;
  let mockLogger: any;
  let mockPlaceService: any;

  beforeEach(() => {
    mockLogger = { warn: jest.fn() };
    mockPlaceService = {
      findPlaceById: jest.fn(),
    };
    routeService = new RouteService(mockLogger, mockPlaceService);
  });

  it("calculateRoute returns route object if path found", async () => {
    mockPlaceService.findPlaceById.mockResolvedValueOnce({
      location: { coordinates: [0, 0] },
    });
    mockPlaceService.findPlaceById.mockResolvedValueOnce({
      location: { coordinates: [1, 1] },
    });
    const result = await routeService.calculateRoute(
      "from",
      "to",
      TravelMode.Walking,
    );
    expect(result).toHaveProperty("distance");
    expect(result).toHaveProperty("estimatedTime");
    expect(result).toHaveProperty("path");
  });

  it("calculateRoute returns null if path not found", async () => {
    // Spy on private aStarPath method
    jest
      .spyOn<any, any>(routeService as any, "aStarPath")
      .mockReturnValue(null);
    mockPlaceService.findPlaceById.mockResolvedValue({
      location: { coordinates: [0, 0] },
    });

    const result = await routeService.calculateRoute(
      "from",
      "to",
      TravelMode.Walking,
    );
    expect(result).toBeNull();
    expect(mockLogger.warn).toHaveBeenCalled();
  });
});
