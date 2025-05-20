import "reflect-metadata";
import { DataSource } from "typeorm";
import config from "../config";
import { Place } from "../entities/Place";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  synchronize: true,
  logging: config.db.logging,
  entities: [Place],
  migrations: [`${__dirname}/../migrations/**/*.{ts,js}`],
  migrationsTableName: "_migrations",
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connection established successfully");
  } catch (error) {
    console.error("Error during database initialization:", error);
  }
};
