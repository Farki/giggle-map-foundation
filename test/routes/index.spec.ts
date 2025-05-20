import request from "supertest";
import express from "express";
import { createMainRouter } from "../../src/routes";
import { Container } from "../../src/container/container";

describe("Main Router", () => {
  const app = express();
  const container = {} as Container;
  app.use(createMainRouter(container));

  it("GET /health should return ok", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBeDefined();
  });

  it("GET / should not error", async () => {
    const res = await request(app).get("/");
    expect([200, 404]).toContain(res.status);
  });
});
