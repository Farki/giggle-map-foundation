import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { HttpStatusCodes } from "../utils/constants/enums";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(HttpStatusCodes.BadRequest).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        // @ts-ignore
        path: err?.path,
        // @ts-ignore
        value: err?.value,
        message: err?.msg,
      })),
    });

    return;
  }

  next();
};
