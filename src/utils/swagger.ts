import config from "../config";
import swaggerJsdoc from "swagger-jsdoc";

export const generateSwaggerDoc = () => {
  const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
      title: "GiggleMap",
      version: "1.0.0",
      description: "API documentation for GiggleMap",
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
      },
    ],
  };

  const options = {
    swaggerDefinition,
    apis: ["./src/controllers/**/*.ts"],
    tags: [
      { name: "Home", description: "Homepage route" },
      { name: "Health", description: "Health check route" },
      { name: "Places", description: "Places routes" },
    ],
  };

  return swaggerJsdoc(options);
};
