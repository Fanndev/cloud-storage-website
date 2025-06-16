import {
  getAccessTokenFromRefreshToken,
  googleCallback,
  googleRedirect,
} from "../../controllers/auth.controller";
import { Router } from "express";

const authRouter = Router();

authRouter.get("/google", googleRedirect);
authRouter.get("/google/callback", googleCallback);
authRouter.get("/logout", googleCallback);
authRouter.get("/access-token", getAccessTokenFromRefreshToken);

export default authRouter;
