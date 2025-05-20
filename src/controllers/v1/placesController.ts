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

/**
 * @openapi
 * /v1/places:
 *   get:
 *     summary: Get a list of places
 *     tags:
 *       - Places
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: List of places
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 count:
 *                   type: integer
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Place'
 *
 *   post:
 *     summary: Create a new place
 *     tags:
 *       - Places
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceInput'
 *     responses:
 *       201:
 *         description: Place created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Place'
 *
 * /v1/places/{id}:
 *   get:
 *     summary: Get a place by ID
 *     tags:
 *       - Places
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place ID
 *     responses:
 *       200:
 *         description: Place found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Place'
 *       404:
 *         description: Place not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Place not found
 *   put:
 *     summary: Update a place by ID
 *     tags:
 *       - Places
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Place ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlaceInput'
 *     responses:
 *       200:
 *         description: Place updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/Place'
 *       404:
 *         description: Place not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Place not found
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     Place:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 *     PlaceInput:
 *       type: object
 *       required:
 *         - name
 *         - latitude
 *         - longitude
 *       properties:
 *         name:
 *           type: string
 *         latitude:
 *           type: number
 *         longitude:
 *           type: number
 */
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
