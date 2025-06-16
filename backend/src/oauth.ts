import { google } from "googleapis";
import { _GOOGLE_CLIENT_ID, _GOOGLE_CLIENT_SECRET } from "./secret";
import fs from "fs";

export const oauth2Client = new google.auth.OAuth2(
  _GOOGLE_CLIENT_ID,
  _GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/api/auth/google/callback"
);

export const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/drive",
  "openid",
];

export const oauthURL = oauth2Client.generateAuthUrl({
  access_type: "offline",
  prompt: "consent",
  scope: scopes,
  include_granted_scopes: true,
});

export const drive = google.drive({ version: "v3", auth: oauth2Client });

export function readCred() {
  try {
    const creds = fs.readFileSync("cred.json");
    oauth2Client.setCredentials(JSON.parse(creds as any));
  } catch {
    console.log("cred.json not found");
  }
}
