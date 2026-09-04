import connectMongo from "@/lib/mongodb";
import Bootcamp from "@/models/Bootcamp";
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

    const bootcamp = await Bootcamp.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json({ success: true, bootcamp }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update bootcamp", details: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await connectMongo();

    const bootcamp = await Bootcamp.findById(id);
    if (bootcamp && bootcamp.tracks && bootcamp.tracks.length > 0) {
      await Track.deleteMany({ _id: { $in: bootcamp.tracks } });
    }
    await Bootcamp.findByIdAndDelete(id);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete bootcamp", details: error.message }, { status: 500 });
  }
}
