import { google } from "googleapis";
import { NextResponse } from "next/server";
import { Readable } from "stream";

export async function POST(req) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    // Google Drive authentication
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ["https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/drive"],
    });

    const drive = google.drive({ version: "v3", auth });

    // Handle full URL or just the ID for the folder
    let folderId = process.env.GOOGLE_DRIVE_COURSE_FOLDER_ID || process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (folderId && folderId.includes("folders/")) {
      folderId = folderId.split("folders/")[1]?.split("?")[0];
    }

    const response = await drive.files.create({
      requestBody: {
        name: file.name,
        mimeType: file.type,
        parents: [folderId],
      },
      media: {
        mimeType: file.type,
        body: stream,
      },
      fields: "id, webViewLink, webContentLink",
    });

    const fileId = response.data.id;

    // Set permissions to "anyone with link can view"
    await drive.permissions.create({
      fileId: fileId,
      requestBody: {
        role: "reader",
        type: "anyone",
      },
    });

    return NextResponse.json({
      success: true,
      fileId,
      link: response.data.webViewLink,
    });
  } catch (error) {
    console.error("Drive upload error:", error);
    return NextResponse.json({ error: "Failed to upload file", details: error.message }, { status: 500 });
  }
}
