import { google } from "googleapis";
import { _GOOGLE_CLIENT_ID, _GOOGLE_CLIENT_SECRET } from "./secret";

export const oauth2Client = new google.auth.OAuth2(
  _GOOGLE_CLIENT_ID,
  _GOOGLE_CLIENT_SECRET,
  "http://localhost:5000/api/auth/google/callback"
);

export const scopes = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

export const oauthURL = oauth2Client.generateAuthUrl({
  access_type: "offline",
  scope: scopes,
  include_granted_scopes: true,
});
