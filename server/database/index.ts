import { SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV || "development";
const envFile = path.resolve(__dirname, "../.env");
dotenv.config({ path: envFile });

const config: { [key: string]: SequelizeOptions } = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as unknown as number,
    dialect: "postgres",
    logging: false,
  },
  staging: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as unknown as number,
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT as unknown as number,
    dialect: "postgres",
    logging: false,
  },
};

export function generateDatabaseConfig(env): SequelizeOptions {
  return config[env];
}

// * this too
// module.exports = config;
