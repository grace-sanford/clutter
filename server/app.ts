import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import apiRouter from "../server/expressApiExample";

const app: Application = express();

app.use(cors());

app.use(morgan("dev"));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log incoming request bodies (helpful for debugging)
app.use((req, res, next) => {
  let requestBody = "";

  req.on("data", (chunk) => {
    requestBody += chunk.toString();
  });

  req.on("end", () => {
    console.log("Request Body:", requestBody);
    next();
  });
});

// Use the API router for paths starting with "/api"
app.use("/api", apiRouter);

export default app;
