import connectMongo from "@/lib/mongodb";
import WorkshopRegistration from "@/models/WorkshopRegistration";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Workshop from "@/models/Workshop";

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
    const { lectureId, watched, quizPassed, quizScore } = body;

    const registration = await WorkshopRegistration.findOne({
      userEmail: session.user.email,
      workshopId: workshop._id
    });

    if (!registration) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    // Find if progress for this lecture already exists
    const progressIndex = registration.progress.findIndex(p => p.lectureId.toString() === lectureId);

    if (progressIndex > -1) {
      // Update existing progress
      registration.progress[progressIndex].watched = watched !== undefined ? watched : registration.progress[progressIndex].watched;
      registration.progress[progressIndex].quizPassed = quizPassed !== undefined ? quizPassed : registration.progress[progressIndex].quizPassed;
      registration.progress[progressIndex].quizScore = quizScore !== undefined ? quizScore : registration.progress[progressIndex].quizScore;
    } else {
      // Add new progress
      registration.progress.push({
        lectureId,
        watched: watched || false,
        quizPassed: quizPassed || false,
        quizScore: quizScore || 0
      });
    }

    // Check if all lectures are passed to mark workshop as completed
    const allLecturesPassed = workshop.lectures.every(lecture => {
      const p = registration.progress.find(pr => pr.lectureId.toString() === lecture._id.toString());
      return p && p.quizPassed;
    });

    if (allLecturesPassed) {
      registration.completed = true;
    }

    await registration.save();

    return NextResponse.json({ success: true, progress: registration.progress, completed: registration.completed }, { status: 200 });
  } catch (error) {
    console.error("Progress update error:", error);
    return NextResponse.json({ error: "Failed to update progress", details: error.message }, { status: 500 });
  }
}
