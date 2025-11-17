import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize-typescript";
import { generateDatabaseConfig } from "./index";
import { User } from "./models/users.model";
import { Post } from "./models/posts.model";
import { Follow } from "./models/follows.model";
dotenv.config();

const env = process.env.NODE_ENV! || "development";
if (env === "development" || env === "test") {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

const sequelize = new Sequelize({
  ...generateDatabaseConfig(env),
  models: [User, Post, Follow],
});

export default sequelize;
