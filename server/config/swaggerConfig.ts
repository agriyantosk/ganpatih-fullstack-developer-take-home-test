import path from "path";

const swaggerOptions = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "API Docs",
      version: "1.0.0",
      description: "User REST HTTP",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: "Local Development",
      },
    ],
  },
  apis: [path.resolve(__dirname, "../docs/*.yaml")],
  explorer: true,
};

export default swaggerOptions;
