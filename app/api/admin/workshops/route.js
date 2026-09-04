import connectMongo from "@/lib/mongodb";
import Workshop from "@/models/Workshop";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongo();
    const workshops = await Workshop.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, workshops }, { status: 200 });
  } catch (error) {
    console.error("Fetch workshops error:", error);
    return NextResponse.json({ error: "Failed to fetch workshops", details: error.message }, { status: 500 });
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

    const workshop = await Workshop.create(body);

    return NextResponse.json({ success: true, workshop }, { status: 201 });
  } catch (error) {
    console.error("Workshop creation error:", error);
    return NextResponse.json({ error: "Failed to create workshop", details: error.message }, { status: 500 });
  }
}
