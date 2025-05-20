import { NextFunction, Request, Response } from "express";
import config from "../config";
import ApiError from "../errors/ApiError";
import { getErrorMessage } from "../utils/error";

/**
 * Global Error Handler
 */
export default function errorHandler(
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (res.headersSent || config.debug) {
    next(error);
    return;
  }
  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code,
      },
    });
    return;
  }

  res.status(500).json({
    error: {
      message: getErrorMessage(error) || "An error occurred.",
    },
  });
}
