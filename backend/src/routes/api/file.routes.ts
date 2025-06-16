import { verifyGoogleAccessToken } from "../../middlewares/verify_accestoken";
import {
  uploadFile,
  readFiles,
  deleteFile,
} from "../../controllers/files.controller";
import { Router } from "express";

const fileRouter = Router();

fileRouter.post("/upload", uploadFile);
fileRouter.get("/read", verifyGoogleAccessToken, readFiles);
fileRouter.delete("/delete/:fileId", verifyGoogleAccessToken, deleteFile);

export default fileRouter;
