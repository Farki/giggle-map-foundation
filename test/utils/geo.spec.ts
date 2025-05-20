import { haversine } from "../../src/utils/geo";

describe("haversine", () => {
  it("calculates zero distance for identical points", () => {
    const point = [0, 0];
    expect(haversine(point, point)).toBeCloseTo(0, 6);
  });

  it("calculates correct distance between two known points", () => {
    // London (51.5074° N, 0.1278° W) and Paris (48.8566° N, 2.3522° E)
    const london = [-0.1278, 51.5074];
    const paris = [2.3522, 48.8566];

    // The actual distance is about 344 km
    expect(haversine(london, paris)).toBeCloseTo(344, 0);
  });

  it("is symmetric (distance A->B == B->A)", () => {
    const a = [10, 20];
    const b = [30, 40];

    expect(haversine(a, b)).toBeCloseTo(haversine(b, a), 6);
  });
});
