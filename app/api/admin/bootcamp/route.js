import connectMongo from "@/lib/mongodb";
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
    // We import Track to ensure the schema is registered for populate
    const bootcamps = await Bootcamp.find().populate('tracks').sort({ createdAt: -1 });

    return NextResponse.json({ success: true, bootcamps }, { status: 200 });
  } catch (error) {
    console.error("Fetch bootcamps error:", error);
    return NextResponse.json({ error: "Failed to fetch bootcamps", details: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    await connectMongo();

    const bootcamp = await Bootcamp.create(body);

    return NextResponse.json({ success: true, bootcamp }, { status: 201 });
  } catch (error) {
    console.error("Bootcamp creation error:", error);
    return NextResponse.json({ error: "Failed to create bootcamp", details: error.message }, { status: 500 });
  }
}
