import connectMongo from "@/lib/mongodb";
import Track from "@/models/Track";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();
    
    await connectMongo();

    const track = await Track.findByIdAndUpdate(id, body, { new: true });

    if (!track) {
      return NextResponse.json({ error: "Track not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, track }, { status: 200 });
  } catch (error) {
    console.error("Track update error:", error);
    return NextResponse.json({ error: "Failed to update track", details: error.message }, { status: 500 });
  }
}
