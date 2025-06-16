import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { _GOOGLE_CLIENT_ID, _GOOGLE_CLIENT_SECRET, _PORT } from "./secret";
import routes from "./routes/routes";
import cookieParser from "cookie-parser";
import { verifyGoogleAccessToken } from "./middlewares/verify_accestoken";
import { readCred } from "./oauth";

dotenv.config();
readCred();

const app = express();
const PORT = _PORT;

app.use(express.json());
app.use(fileUpload());
app.use(cookieParser());

app.use("/api", routes);

app.get("/", (req: Request, res: Response): any =>
  res.json({
    message: "Server Is  Running",
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  })
);
app.get("/test", verifyGoogleAccessToken, (req: Request, res: Response): any =>
  res.json({
    message: "Server Is  Running",
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
  })
);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
