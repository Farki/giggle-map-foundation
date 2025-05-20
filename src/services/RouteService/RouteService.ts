import { haversine } from "../../utils/geo";
import { TravelMode } from "../../utils/constants/enums";
import { Logger } from "winston";
import PlaceService from "../PlaceService/PlaceService";

type Point = {
  lat: number;
  lng: number;
};

type Node = {
  point: Point;
  g: number;
  h: number;
  f: number;
  parent?: Node;
};

export default class RouteService {
  constructor(
    private readonly logger: Logger,
    private readonly placeService: PlaceService,
  ) {}

  public async calculateRoute(
    fromPlaceId: string,
    toPlaceId: string,
    mode: TravelMode,
  ) {
    const [fromPlace, toPlace] = await Promise.all([
      this.placeService.findPlaceById(fromPlaceId),
      this.placeService.findPlaceById(toPlaceId),
    ]);

    const from = this.extractPoint(fromPlace.location.coordinates);
    const to = this.extractPoint(toPlace.location.coordinates);

    const dummyPoints = this.generateDummyPointsBetween(from, to, 100);
    const rawPath = this.aStarPath(from, to, [from, ...dummyPoints, to]);

    if (!rawPath) {
      this.logger.warn("A* failed to find a path between points");
      return null;
    }

    const distance = haversine([from.lat, from.lng], [to.lat, to.lng]);
    const estimatedTime = this.estimateTravelTime(distance, mode);

    return {
      mode,
      distance,
      estimatedTime,
      path: [
        this.toGeoJsonPoint(from),
        ...rawPath.map(this.toGeoJsonPoint),
        this.toGeoJsonPoint(to),
      ],
    };
  }

  private extractPoint([lat, lng]: number[]): Point {
    return { lat, lng };
  }

  private toGeoJsonPoint({ lat, lng }: Point) {
    return {
      type: "Point" as const,
      coordinates: [lng, lat],
    };
  }

  private estimateTravelTime(distance: number, mode: TravelMode): number {
    const speedKmH =
      {
        [TravelMode.Walking]: 5,
        [TravelMode.Cycling]: 15,
        [TravelMode.Driving]: 100,
      }[mode] ?? 100;

    return (distance / speedKmH) * 60;
  }

  // A* Pathfinding Algorithm with dummy data
  private aStarPath(start: Point, end: Point, points: Point[]): Point[] | null {
    const getKey = ({ lat, lng }: Point) =>
      `${lat.toFixed(6)}:${lng.toFixed(6)}`;
    const pointList = points;
    const pointMap = new Map<string, number>();
    pointList.forEach((p, i) => pointMap.set(getKey(p), i));

    const startNode: Node = {
      point: start,
      g: 0,
      h: this.heuristic(start, end),
      f: 0,
    };
    startNode.f = startNode.h;

    const openSet: Node[] = [startNode];
    const closedSet: Set<string> = new Set();

    while (openSet.length > 0) {
      openSet.sort((a, b) => a.f - b.f);
      const current = openSet.shift()!;
      closedSet.add(getKey(current.point));

      if (this.heuristic(current.point, end) < 0.0005) {
        return this.reconstructPath(current);
      }

      const idx = pointMap.get(getKey(current.point));
      if (idx === undefined) continue;

      // Only consider immediate neighbors
      const neighborIndices = [idx - 1, idx + 1].filter(
        (i) => i >= 0 && i < pointList.length,
      );

      for (const ni of neighborIndices) {
        const neighborPoint = pointList[ni];
        const key = getKey(neighborPoint);
        if (closedSet.has(key)) continue;

        const tentativeG =
          current.g + this.heuristic(current.point, neighborPoint);

        let neighbor = openSet.find((n) => getKey(n.point) === key);
        if (!neighbor) {
          neighbor = {
            point: neighborPoint,
            g: tentativeG,
            h: this.heuristic(neighborPoint, end),
            f: 0,
            parent: current,
          };
          neighbor.f = neighbor.g + neighbor.h;
          openSet.push(neighbor);
        } else if (tentativeG < neighbor.g) {
          neighbor.g = tentativeG;
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.parent = current;
        }
      }
    }

    return null; // No path found
  }

  private heuristic(p1: Point, p2: Point): number {
    return haversine([p1.lat, p1.lng], [p2.lat, p2.lng]);
  }

  private reconstructPath(node: Node): Point[] {
    const path: Point[] = [];
    let current: Node | undefined = node;
    while (current?.parent) {
      path.unshift(current.point);
      current = current.parent;
    }
    return path;
  }

  private generateDummyPointsBetween(
    from: Point,
    to: Point,
    count: number,
  ): Point[] {
    const points: Point[] = [];
    for (let i = 1; i <= count; i++) {
      const t = i / (count + 1);
      points.push({
        lat:
          from.lat + (to.lat - from.lat) * t + (Math.random() - 0.5) * 0.0003,
        lng:
          from.lng + (to.lng - from.lng) * t + (Math.random() - 0.5) * 0.0003,
      });
    }
    return points;
  }
}
