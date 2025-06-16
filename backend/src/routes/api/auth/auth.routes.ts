import {
  googleCallback,
  googleRedirect,
} from "../../../controllers/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/google", googleRedirect);
authRouter.get("/google/callback", googleCallback);

export default authRouter;
