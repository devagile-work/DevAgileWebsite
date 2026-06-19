import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { fileId } = await req.json();

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    // Google Drive authentication using Personal OAuth2 (Refresh Token)
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    // We NO LONGER set permissions to "anyone with link can view" to keep it secure.
    // The file stays private to the Service Account.
    
    // Instead of returning a public webViewLink, we just return the raw fileId 
    // so it can be saved in the database under the 'link' field.
    return NextResponse.json({
      success: true,
      link: fileId,
    });
  } catch (error) {
    console.error("Drive upload finalize error:", error);
    return NextResponse.json({ error: "Failed to finalize upload", details: error.message }, { status: 500 });
  }
}

