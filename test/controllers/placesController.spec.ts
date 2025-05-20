import request from "supertest";
import express, { Express } from "express";
import placesController from "../../src/controllers/v1/placesController";
import PlaceService from "../../src/services/PlaceService/PlaceService";
import { Container } from "../../src/container/container";

jest.mock("../../src/services/PlaceService/PlaceService");

describe("placesController", () => {
  let app: Express;
  let mockPlaceService: jest.Mocked<PlaceService>;

  beforeEach(() => {
    // Create a mocked instance of PlaceService
    mockPlaceService = {
      getPlaces: jest.fn().mockResolvedValue([{ id: 1, name: "Test Place" }]),
      createPlace: jest.fn().mockResolvedValue({ id: 2, name: "New Place" }),
    } as unknown as jest.Mocked<PlaceService>;

    app = express();
    app.use(express.json());
    app.use(
      "/places",
      placesController({
        placeService: mockPlaceService,
      } as unknown as Container),
    );
  });

  it("GET /places returns places", async () => {
    const res = await request(app).get("/places");

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(1);
    expect(res.body.data[0].name).toBe("Test Place");
    expect(mockPlaceService.getPlaces).toHaveBeenCalled();
  });

  it("POST /places creates a place", async () => {
    const placeData = { name: "New Place", latitude: 1, longitude: 2 };

    const res = await request(app).post("/places").send(placeData);

    expect(res.status).toBe(201);
    expect(res.body.data.name).toBe("New Place");
    expect(mockPlaceService.createPlace).toHaveBeenCalledWith(placeData);
  });
});
