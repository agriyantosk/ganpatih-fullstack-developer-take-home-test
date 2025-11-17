import { CorsOptions } from "cors";

const allowedOrigins =
  process.env.NODE_ENV === "development"
    ? ["http://localhost:3000"]
    : ["https://opulent-journey-56vvp5j5g4q345jq-3000.app.github.dev/"];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log("[CORS] Request Origin:", origin);

    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Not allowed by CORS"));
  },

  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "DNT",
    "X-CustomHeader",
    "Keep-Alive",
    "User-Agent",
    "X-Requested-With",
    "If-Modified-Since",
    "Cache-Control",
    "Content-Type",
    "Authorization",
    "ngrok-skip-browser-warning",
  ],

  credentials: true,
};

export default corsOptions;
