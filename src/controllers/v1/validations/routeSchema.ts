import { Schema } from "express-validator";

export const getRouteValidationSchema: Schema = {
  from_place_id: {
    in: "body",
    isString: {
      errorMessage: "From must be a string",
    },
    notEmpty: {
      errorMessage: "From cannot be empty",
    },
  },
  to_place_id: {
    isString: {
      errorMessage: "From must be a string",
    },
    notEmpty: {
      errorMessage: "From cannot be empty",
    },
  },
  travel_mode: {
    in: "body",
    isString: {
      errorMessage: "Travel mode must be a string",
    },
    isIn: {
      options: [["walking", "cycling", "driving"]],
      errorMessage: "Travel mode must be one of: walking, cycling, driving",
    },
    notEmpty: {
      errorMessage: "Travel mode cannot be empty",
    },
  },
};
