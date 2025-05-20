import request from "supertest";
import express from "express";
import { healthController } from "../../src/controllers/healthController";
import { AppDataSource } from "../../src/utils/database";

describe("healthController", () => {
  beforeAll(() => {
    Object.defineProperty(AppDataSource, "isInitialized", {
      get: jest.fn(() => true),
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should return status ok when DB and Redis are ready", async () => {
    const app = express();
    app.get("/health", healthController({}));

    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
    expect(res.body.services).toHaveProperty("database");
    expect(res.body.services).toHaveProperty("redis");
  });
});
