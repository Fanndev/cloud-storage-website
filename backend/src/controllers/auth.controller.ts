import { Request, Response } from "express";
import { oauth2Client, oauthURL } from "../oauth";
import { google } from "googleapis";
import prismaClient from "../prisma";

export async function googleRedirect(req: Request, res: Response) {
  res.redirect(oauthURL);
}

export async function googleCallback(req: Request, res: Response) {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const user = await oauth2.userinfo.get();
}
