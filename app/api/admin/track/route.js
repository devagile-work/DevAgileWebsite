import connectMongo from "@/lib/mongodb";
import Track from "@/models/Track";
import Bootcamp from "@/models/Bootcamp";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { bootcampId, ...trackData } = body;
    
    if (!bootcampId) {
      return NextResponse.json({ error: "bootcampId is required" }, { status: 400 });
    }

    await connectMongo();

    // 1. Create the Track
    const track = await Track.create(trackData);

    // 2. Add Track ID to Bootcamp
    await Bootcamp.findByIdAndUpdate(
      bootcampId,
      { $push: { tracks: track._id } },
      { new: true }
    );

    return NextResponse.json({ success: true, track }, { status: 201 });
  } catch (error) {
    console.error("Track creation error:", error);
    return NextResponse.json({ error: "Failed to create track", details: error.message }, { status: 500 });
  }
}

