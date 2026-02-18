import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const _PORT = process.env.PORT;
export const _serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS!;
export const _GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const _GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const _GOOGLE_FOLDER_ID = process.env.GOOGLE_FOLDER_ID;
