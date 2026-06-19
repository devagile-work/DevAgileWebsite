import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileName, mimeType } = await req.json();

    if (!fileName || !mimeType) {
      return NextResponse.json({ error: "Missing file metadata" }, { status: 400 });
    }

    // Google Drive authentication using Personal OAuth2 (Refresh Token)
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const token = await auth.getAccessToken();

    // Determine Folder ID
    let folderId = process.env.GOOGLE_DRIVE_COURSE_FOLDER_ID || process.env.GOOGLE_DRIVE_FOLDER_ID;
    if (!folderId) {
       return NextResponse.json({ error: "No Google Drive Folder ID found in environment variables." }, { status: 400 });
    }

    if (folderId.includes("folders/")) {
      folderId = folderId.split("folders/")[1]?.split("?")[0];
    }

    // Get the origin from the request to pass to Google Drive for CORS
    const origin = req.headers.get("origin") || process.env.NEXTAUTH_URL || "http://localhost:3000";

    // Start a Resumable Upload Session
    const response = await fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.token}`,
        "Content-Type": "application/json",
        "X-Upload-Content-Type": mimeType,
        "Origin": origin, // CRITICAL FOR CORS! Google will reject the frontend PUT without this.
      },
      body: JSON.stringify({
        name: fileName,
        parents: [folderId],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: "Failed to initialize upload session", details: errorText }, { status: response.status });
    }

    const uploadUrl = response.headers.get("Location");

    return NextResponse.json({
      success: true,
      uploadUrl,
    });
  } catch (error) {
    console.error("Drive upload init error:", error);
    return NextResponse.json({ error: "Failed to initialize upload", details: error.message }, { status: 500 });
  }
}
