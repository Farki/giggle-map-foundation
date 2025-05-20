import { Router, Request, Response } from "express";
import { Container } from "../../container/container";
import { checkSchema } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";
import { HttpStatusCodes } from "../../utils/constants/enums";
import {
  createPlaceValidationSchema,
  getPlacesValidationSchema,
  getPlaceValidationSchema,
  updatePlaceValidationSchema,
} from "./validations/placeSchema";

interface QueryParams {
  page?: string;
  limit?: string;
  category?: string;
}

export default ({ placeService }: Container) => {
  const router = Router();

  router.get(
    "/",
    checkSchema(getPlacesValidationSchema),
    validateRequest,
    async (req: Request, res: Response) => {
      const { page = "1", limit = "10" } = req.query as QueryParams;
      const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
      };

      const places = await placeService.getPlaces(options);

      res.status(HttpStatusCodes.Ok).json({
        count: places.length,
        data: places,
      });
    },
  );

  router.post(
    "/",
    checkSchema(createPlaceValidationSchema),
    validateRequest,
    async (req: Request, res: Response) => {
      const newPlace = await placeService.createPlace(req.body);

      res.status(HttpStatusCodes.Created).json({
        data: newPlace,
      });
    },
  );

  router.get(
    "/:id",
    checkSchema(getPlaceValidationSchema),
    validateRequest,
    async (req: Request, res: Response) => {
      const place = await placeService.findPlaceById(req.params.id);

      if (!place) {
        res.status(HttpStatusCodes.NotFound).json({
          message: "Place not found",
        });
        return;
      }

      res.status(HttpStatusCodes.Ok).json({
        data: place,
      });
    },
  );

  router.put(
    "/:id",
    checkSchema(updatePlaceValidationSchema),
    validateRequest,
    async (req: Request, res: Response) => {
      const place = await placeService.updatePlace(req.params.id, req.body);

      if (!place) {
        res.status(HttpStatusCodes.NotFound).json({
          message: "Place not found",
        });
        return;
      }

      res.status(HttpStatusCodes.Ok).json({
        data: place,
      });
    },
  );

  return router;
};
