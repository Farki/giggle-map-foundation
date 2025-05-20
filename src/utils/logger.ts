import { createLogger, transports, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import fs from "fs";
import path from "path";
import config from "../config";

let loggerInstance: ReturnType<typeof createLogger> | null = null;

export const getLogger = () => {
  if (loggerInstance) {
    return loggerInstance;
  }

  // Ensure log directory exists
  if (!fs.existsSync(config.logDirectory)) {
    fs.mkdirSync(config.logDirectory, { recursive: true });
  }

  const logLevel = config.env === "development" ? "debug" : "warn";

  const dailyRotateFile = new DailyRotateFile({
    level: logLevel,
    filename: path.join(config.logDirectory, "%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    handleExceptions: true,
    maxSize: "20m",
    maxFiles: "14d",
    format: format.combine(
      format.errors({ stack: true }),
      format.timestamp(),
      format.json(),
    ),
  });

  loggerInstance = createLogger({
    level: logLevel,
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.errors({ stack: true }),
          format.simple(),
        ),
      }),
      dailyRotateFile,
    ],
    exceptionHandlers: [dailyRotateFile],
    exitOnError: false,
  });

  return loggerInstance;
};
