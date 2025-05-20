import { Container } from "../../container/container";
import { Request, Response, Router } from "express";
import { checkSchema } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { getRouteValidationSchema } from "./validations/routeSchema";

export default ({ routeService }: Container) => {
  const router = Router();

  router.post(
    "/calculate-route",
    checkSchema(getRouteValidationSchema),
    validateRequest,
    async (req: Request, res: Response) => {
      const { from_place_id, to_place_id, travel_mode } = req.body;

      const route = await routeService.calculateRoute(
        from_place_id,
        to_place_id,
        travel_mode,
      );

      res.json(route);
    },
  );

  return router;
};
