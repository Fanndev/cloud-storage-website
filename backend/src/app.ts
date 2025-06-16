import express from "express";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import { _PORT } from "./secret";
import routes from "./routes/api/routes";

dotenv.config();

const app = express();
const PORT = _PORT;

app.use(express.json());
app.use(fileUpload());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
