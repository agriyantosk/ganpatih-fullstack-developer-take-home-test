import { SequelizeOptions } from "sequelize-typescript";
import dotenv from "dotenv";
import path from "path";

const envFile = path.resolve(__dirname, "../.env");
dotenv.config({ path: envFile });

const config: { [key: string]: SequelizeOptions } = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: "postgres",
    logging: false,
  },
  staging: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: "postgres",
    logging: false,
  },
  production: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    dialect: "postgres",
    logging: false,
  },
};

export function generateDatabaseConfig(env): SequelizeOptions {
  return config[env];
}

export default config;

module.exports = config;
module.exports.generateDatabaseConfig = generateDatabaseConfig;
