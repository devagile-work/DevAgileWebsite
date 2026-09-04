import connectMongo from "@/lib/mongodb";
import WorkshopRegistration from "@/models/WorkshopRegistration";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(req, { params }) {
  try {
    const password = req.headers.get("x-admin-password");
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    await connectMongo();

    const registrations = await WorkshopRegistration.find({ workshopId: id }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, registrations }, { status: 200 });
  } catch (error) {
    console.error("Fetch workshop stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats", details: error.message }, { status: 500 });
  }
}
