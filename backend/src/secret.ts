import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const _PORT = process.env.PORT || 5000;
export const _JWTSECRET = process.env._JWT_SECRET!;
export const _serviceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS!;
export const _GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
export const _GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
