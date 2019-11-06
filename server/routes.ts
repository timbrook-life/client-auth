import { Application } from "express";
import loginRouter from "./api/controllers/login/router";
export default function routes(app: Application): void {
  app.use("/api/v1/login", loginRouter);
}
