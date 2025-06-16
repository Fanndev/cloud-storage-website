import { Router } from "express";
import authRouter from "./api/auth.routes";
import fileRouter from "./api/file.routes";

const routes = Router();

routes.use("/auth", authRouter);
routes.use("/file", fileRouter);

export default routes;
