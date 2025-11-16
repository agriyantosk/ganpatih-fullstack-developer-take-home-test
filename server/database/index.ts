import { SequelizeOptions } from "sequelize-typescript";

// * if you want to create db using sequelize-cli, uncomment this.
// * after uncomment, use 'npm run build' to build app
// * then npx sequelize-cli db:create
// * after that comment again
// import dotenv from "dotenv";
// dotenv.config();

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
