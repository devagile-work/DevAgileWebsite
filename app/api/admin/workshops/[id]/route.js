import connectMongo from "@/lib/mongodb";
import Workshop from "@/models/Workshop";
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

    const workshop = await Workshop.findByIdAndUpdate(id, body, { new: true });
    
    if (!workshop) {
       return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, workshop }, { status: 200 });
  } catch (error) {
    console.error("Workshop update error:", error);
    return NextResponse.json({ error: "Failed to update workshop", details: error.message }, { status: 500 });
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

    const workshop = await Workshop.findByIdAndDelete(id);
    if (!workshop) {
       return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Workshop deletion error:", error);
    return NextResponse.json({ error: "Failed to delete workshop", details: error.message }, { status: 500 });
  }
}
