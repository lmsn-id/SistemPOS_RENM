import type { Application } from "express";
import cookieParser from "cookie-parser";

export const applyMiddlewares = (app: Application) => {
  app.use(cookieParser());
  console.log("Middleware applied: Cookie Parser");
};
