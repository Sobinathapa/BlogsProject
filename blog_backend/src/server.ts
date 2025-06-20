import "reflect-metadata";
import "module-alias/register.js";

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";

import sequelize from "@/config/db.config";
import env from "@/config/env.config";
import Routes from "@/routes";
import { uploadsDir } from "./middlewares/multer.middleware";
import { ApiError } from "@/utils";
import { errorHandlerMiddleware } from "@/middlewares";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(uploadsDir));

app.use("/api/v1", Routes);

app.use((req: Request, res: Response) => {
  if (req.originalUrl.startsWith("/uploads")) {
    res.status(404).end();
    return;
  }

  throw new ApiError({
    status: 404,
    message: "Not Found",
    errors: [
      {
        message: `Cannot ${req.method} ${req.originalUrl}`,
      },
    ],
  });
});

app.use(errorHandlerMiddleware);

app.listen(env.PORT, async () => {
  console.log(`🚀 Server is running on port: ${env.PORT}`);
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: false });
    console.log("✅ Connected to database.");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
});
