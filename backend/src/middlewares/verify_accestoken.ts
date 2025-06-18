import { Request, Response, NextFunction } from "express";
import { oauth2Client } from "../oauth";
import { _GOOGLE_CLIENT_ID } from "../secret";

export async function verifyGoogleAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  const token = req.headers.authorization;
  try {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    if (!response.ok) {
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Token invalid or expired", token });
  }
}
