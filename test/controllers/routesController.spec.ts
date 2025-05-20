import request from "supertest";
import express from "express";
import routesController from "../../src/controllers/v1/routesController";
import { Container } from "../../src/container/container";

describe("routesController", () => {
  let app: express.Express;
  let mockRouteService;

  beforeEach(() => {
    mockRouteService = {
      calculateRoute: jest.fn().mockResolvedValue({
        distance: 1000,
        estimatedTime: 600,
        path: [
          { lat: 0, lng: 0 },
          { lat: 1, lng: 1 },
        ],
      }),
    };
    app = express();
    app.use(express.json());
    app.use(
      "/routes",
      routesController(<Container>(
        (<unknown>{ routeService: mockRouteService })
      )),
    );
  });

  it("POST /routes/calculate-route returns route", async () => {
    const res = await request(app)
      .post("/routes/calculate-route")
      .send({ from_place_id: "1", to_place_id: "2", travel_mode: "walking" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("distance");
    expect(res.body).toHaveProperty("estimatedTime");
    expect(res.body).toHaveProperty("path");
  });
});
