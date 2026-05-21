import "dotenv/config";
import express from "express";
import cors from "cors";
import profileRoutes from "./routes/profileRoutes";
import gymRoutes from "./routes/lampRoutes";
import requireAuth from "./middleware/authMiddleware";
import errorMiddleware from "./middleware/errorMiddleware";

const app = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/profile", profileRoutes);

app.use(
  "/lamps",
  (req, res, next) => {
    if (req.method === "POST") return requireAuth(req, res, next);
    next();
  },
  gymRoutes,
);

app.use(errorMiddleware);

export default app;
