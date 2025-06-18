import { verifyGoogleAccessToken } from "../../middlewares/verify_accestoken";
import {
  uploadFile,
  readFiles,
  deleteFile,
} from "../../controllers/files.controller";
import { Router } from "express";

const fileRouter = Router();

fileRouter.post("/upload", uploadFile);
fileRouter.get("/upload", verifyGoogleAccessToken, readFiles);
fileRouter.delete("/upload/:fileId", verifyGoogleAccessToken, deleteFile);
fileRouter.get("/", (req: any, res: any) => res.send("Hello World!"));

export default fileRouter;
