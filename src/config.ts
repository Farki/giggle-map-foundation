import "dotenv/config";

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000"),
  debug: process.env.APP_DEBUG === "true",
  corsUrl: process.env.CORS_URL,
  logDirectory: process.env.LOG_DIR || "logs",
  db: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === "true", //set false in production
    logging: process.env.DB_LOGGING === "true", //set false in production
  },
};

export default config;
