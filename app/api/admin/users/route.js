import connectMongo from "@/lib/mongodb";
import User from "@/models/User";
import Bootcamp from "@/models/Bootcamp";
import Track from "@/models/Track";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();
    
    Bootcamp.schema;
    Track.schema;

    const users = await User.find()
      .populate('purchasedBootcamps')
      .populate('purchasedTracks')
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, users }, { status: 200 });
  } catch (error) {
    console.error("Fetch users error:", error);
    return NextResponse.json({ error: "Failed to fetch users", details: error.message }, { status: 500 });
  }
}
