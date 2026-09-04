import connectMongo from "@/lib/mongodb";
import Workshop from "@/models/Workshop";
import WorkshopRegistration from "@/models/WorkshopRegistration";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { slug } = params;
    await connectMongo();

    const workshop = await Workshop.findOne({ slug });
    if (!workshop) {
      return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
    }

    const body = await req.json();
    const { name, contact, expectations } = body;

    // Check if already registered
    const existing = await WorkshopRegistration.findOne({
      userEmail: session.user.email,
      workshopId: workshop._id
    });

    if (existing) {
      return NextResponse.json({ success: true, alreadyRegistered: true, registration: existing }, { status: 200 });
    }

    const registration = await WorkshopRegistration.create({
      userEmail: session.user.email,
      workshopId: workshop._id,
      name,
      contact,
      expectations,
      progress: workshop.lectures.map(l => ({
        lectureId: l._id,
        watched: false,
        quizPassed: false,
        quizScore: 0
      }))
    });

    return NextResponse.json({ success: true, registration }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ error: "Registration failed", details: error.message }, { status: 500 });
  }
}
