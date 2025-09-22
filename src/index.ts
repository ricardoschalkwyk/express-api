import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import createError from "http-errors";
import mongoose from "mongoose";
import logger from "morgan";
import path from "path";
import swaggerUi from "swagger-ui-express";

dotenv.config();

import swaggerSpec from "./swagger";

import v1Routes from "./routes/v1";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", v1Routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

// set the uri value
const uri = process.env.DB_URL || "";
app.set("port", process.env.PORT || 3000);

// connect to the uri
async function main() {
  await mongoose.connect(uri);
}

main().then(() => {
  app.listen(app.get("port"), () => {
    // Listen for connection events
    mongoose.connection.on(
      "error",
      console.error.bind(console, "connection error:")
    );

    mongoose.connection.once("open", function () {
      console.log("Connected to MongoDB!");
    });

    console.log(`Express server listening on port ${app.get("port")}`);
    console.log(process.env.NODE_ENV);
  });
});
