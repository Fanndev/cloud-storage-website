import { Request, Response } from "express";
import { oauth2Client, oauthURL } from "../oauth";
import { google } from "googleapis";
import prismaClient from "../prisma";
import httpResponse from "../utility/httpRes";
import { access } from "fs";

export async function googleRedirect(
  req: Request,
  res: Response
): Promise<any> {
  res.redirect(oauthURL);
}

export async function googleCallback(
  req: Request,
  res: Response
): Promise<any> {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code as string);
  oauth2Client.setCredentials(tokens);
  const oauth2 = google.oauth2({ version: "v2", auth: oauth2Client });
  const user = await oauth2.userinfo.get();
  const existing = await prismaClient.user.findFirst({
    where: {
      email: user.data.email!,
    },
  });
  if (existing) {
    res.cookie("refresh_token", tokens.refresh_token as string, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.json({
      ...httpResponse.CONFLICT,
      ...existing,
      refresh_token: tokens.refresh_token!,
      access_token: tokens.access_token!,
    });
  }
  const userCreated = await prismaClient.user.create({
    data: {
      email: user.data.email!,
      name: user.data.name,
      avatar_url: user.data.picture as string,
      google_id: user.data.id as string,
      access_token: tokens.access_token as string,
      refresh_token: tokens.refresh_token as string,
    },
  });

  res.cookie("refresh_token", tokens.refresh_token as string, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return res.json({ ...httpResponse.CREATED, data: { userCreated } });
}

export async function getAccessTokenFromRefreshToken(
  req: Request,
  res: Response
): Promise<any> {
  try {
    const refreshToken = req.cookies.refresh_token;

    oauth2Client.setCredentials({ refresh_token: refreshToken });
    const { credentials } = await oauth2Client.refreshAccessToken();

    return res.json({
      ...httpResponse.ACCEPTED,
      access_token: credentials.access_token,
    });
  } catch (err) {
    console.error("Gagal refresh access token:", err);
    throw new Error("Refresh token invalid atau sudah dicabut");
  }
}

export async function logout(req: Request, res: Response) {
  res.clearCookie("refresh_token");
  return res.json(httpResponse.ACCEPTED);
}
