import { google } from "googleapis";

export async function GET(req, { params }) {
  const { fileId } = params;

  // ==========================================
  // SECURITY CHECK
  // ==========================================
  // TODO: Before deploying, uncomment and use NextAuth to secure this endpoint!
  /*
  import { getServerSession } from "next-auth/next";
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return new Response("Unauthorized: Please log in", { status: 401 });
  }
  
  // You can also check if the user has purchased the course here by querying MongoDB
  */

  try {
    // Google Drive authentication using Personal OAuth2 (Refresh Token)
    const auth = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET
    );
    auth.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

    const token = await auth.getAccessToken();

    const range = req.headers.get("range");
    const headers = {
      Authorization: `Bearer ${token.token}`,
    };
    
    // If the browser is requesting a specific chunk of the video (seeking), pass the range to Google!
    if (range) {
      headers["Range"] = range;
    }

    const driveRes = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
      method: "GET",
      headers,
    });

    if (!driveRes.ok) {
      const errText = await driveRes.text();
      return new Response(`Failed to fetch video from Drive: ${errText}`, { status: driveRes.status });
    }

    // Pass along the exact headers that HTML5 <video> tags need to understand the stream
    const responseHeaders = new Headers();
    responseHeaders.set("Content-Type", driveRes.headers.get("Content-Type") || "video/mp4");
    
    if (driveRes.headers.has("Content-Length")) {
      responseHeaders.set("Content-Length", driveRes.headers.get("Content-Length"));
    }
    if (driveRes.headers.has("Content-Range")) {
      responseHeaders.set("Content-Range", driveRes.headers.get("Content-Range"));
    }
    if (driveRes.headers.has("Accept-Ranges")) {
      responseHeaders.set("Accept-Ranges", driveRes.headers.get("Accept-Ranges"));
    } else {
      // Force Accept-Ranges so the browser knows it can scrub/seek
      responseHeaders.set("Accept-Ranges", "bytes");
    }

    return new Response(driveRes.body, {
      status: driveRes.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Stream error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
