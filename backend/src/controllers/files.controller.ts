import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

import Stream from "stream";
import { drive, oauth2Client } from "../oauth";
import { _GOOGLE_FOLDER_ID } from "../secret";
import { google } from "googleapis";

export async function uploadFile(req: Request, res: Response) {
  const file = req.files?.file as UploadedFile;

  const bufferStream = new Stream.PassThrough();
  bufferStream.end(file.data);
  const response: any = await drive.files.create({
    requestBody: {
      name: file.name,
      parents: [_GOOGLE_FOLDER_ID] as string[],
    },
    media: {
      mimeType: file.mimetype,
      body: bufferStream,
    },
  });

  res.json({
    message: "File uploaded successfully!",
    fileId: response.data.id,
    fileName: response.data.name,
  });
}

export const readFiles = async (req: Request, res: Response): Promise<any> => {
  try {
    const accessToken = req.headers.authorization;

    const response = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Invalid token", accessToken });
    }

    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    const newDrive = google.drive({ version: "v3", auth: oauth2Client });

    const result = await newDrive.files.list({
      q: `'${_GOOGLE_FOLDER_ID}' in parents and trashed = false`,
      fields: "files(id, name, mimeType, webViewLink, size)",
    });

    res.json({
      success: true,
      files: result?.data?.files ?? [],
    });
  } catch (error: any) {
    console.error("Error reading folder:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteFile = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fileId } = req.params;
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      return res
        .status(401)
        .json({ success: false, message: "Access token missing" });
    }

    oauth2Client.setCredentials({
      access_token: accessToken,
    });

    const drive = google.drive({ version: "v3", auth: oauth2Client });

    await drive.files.delete({
      fileId,
    });

    return res.json({ success: true, message: "File deleted successfully" });
  } catch (error: any) {
    console.error("Failed to delete file:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
