import express from "express";
import passport from "passport";
import setupJWTStrategy from "./auth/index.js";
import todoRouter from "./routes/todo.js";
import authRouter from "./routes/auth.js";

export default function createServer() {
  //Create an instance of an express application
  const app = express();

  //Adds JSON middleware so the server can understand the json data that gets sent to it
  app.use(express.json());

  //Append our JWT strategy to passport to use for authentication
  setupJWTStrategy(passport);

  //Our auth routes
  app.use("/auth", authRouter);

  //Our todo routes. These routes are protected by passport. No JWT === NO ACCESS
  app.use(
    "/todo",
    passport.authenticate("jwt", { session: false }),
    todoRouter
  );

  return app;
}
