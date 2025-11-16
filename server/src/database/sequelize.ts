import dotenv from "dotenv";
import { Sequelize } from "sequelize-typescript";
import { generateDatabaseConfig } from "./index";
import path from "path";
dotenv.config();

const env = process.env.NODE_ENV! || "development";
if (env === "development" || env === "test") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

const sequelize = new Sequelize({
  ...generateDatabaseConfig(env),
  // models: [path.resolve(__dirname, "../models")],
  models: [path.resolve(__dirname, "../models/**/*.ts")],
});

export default sequelize;
