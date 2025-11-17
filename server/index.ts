import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import router from "./routers/index";
import errorHandler from "./middlewares/errorHandler";
import corsOptions from "./config/corsConfig";
import swaggerOptions from "./config/swaggerConfig";
import sequelize from "./database/sequelize";

const env = process.env.NODE_ENV || "development";

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
    await sequelize.sync({ alter: false });
    console.log("Models synchronized.");

    const app = express();

    if (env !== "development") {
      app.set("trust proxy", 1);
    }

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    const swaggerSpec = swaggerJSDoc(swaggerOptions);

    app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
    app.use("/api", router);
    app.use(errorHandler);

    app.listen(process.env.PORT, () => {
      console.log(
        `Backend Service running on http://localhost:${process.env.PORT}`
      );
    });
  } catch (error) {
    console.error("Initialization Error: ", error);
  }
};

init();
