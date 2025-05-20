import { Schema } from "express-validator";
import { baseSchema } from "./baseSchema";

export const getPlacesValidationSchema: Schema = {
  ...baseSchema,
};

export const getPlaceValidationSchema: Schema = {
  id: {
    in: "params",
    isString: {
      errorMessage: "ID must be a string",
    },
    notEmpty: {
      errorMessage: "ID cannot be empty",
    },
  },
};

export const createPlaceValidationSchema: Schema = {
  name: {
    in: "body",
    isString: {
      errorMessage: "Name must be a string",
    },
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
  },
  latitude: {
    in: "body",
    isFloat: {
      errorMessage: "Latitude must be a float",
    },
  },
  longitude: {
    in: "body",
    isFloat: {
      errorMessage: "Longitude must be a float",
    },
  },
};

export const updatePlaceValidationSchema: Schema = {
  id: {
    in: "params",
    isString: {
      errorMessage: "ID must be a string",
    },
    notEmpty: {
      errorMessage: "ID cannot be empty",
    },
  },
  name: {
    in: "body",
    isString: {
      errorMessage: "Name must be a string",
    },
    notEmpty: {
      errorMessage: "Name cannot be empty",
    },
  },
  latitude: {
    in: "body",
    isFloat: {
      errorMessage: "Latitude must be a float",
    },
  },
  longitude: {
    in: "body",
    isFloat: {
      errorMessage: "Longitude must be a float",
    },
  },
};
