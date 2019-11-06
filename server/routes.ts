import { Application } from "express";
import loginRouter from "./api/controllers/login/router";
import statusRouter from "./api/controllers/status/router";

export default function routes(app: Application): void {
  app.use("/api/v1/login", loginRouter);
  app.use("/api/v1/status", statusRouter);
}
