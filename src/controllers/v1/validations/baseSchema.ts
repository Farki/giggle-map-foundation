import { Schema } from "express-validator";

export const baseSchema: Schema = {
  page: {
    in: "query",
    isInt: {
      errorMessage: "Page must be a numeric value",
    },
    optional: true,
  },
  limit: {
    in: "query",
    isInt: {
      options: { max: 1000 },
      errorMessage: "Limit must be a numeric value not greater than 1000",
    },
    optional: true,
  },
};
