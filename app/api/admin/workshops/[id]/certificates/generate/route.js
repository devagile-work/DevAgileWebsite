import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import WorkshopRegistration from '@/models/WorkshopRegistration';
import Workshop from '@/models/Workshop';

export async function POST(request, { params }) {
  try {
    const adminPassword = request.headers.get("x-admin-password");
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { certWorkshopName, certDuration } = body;

    // Connect to DB
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const workshop = await Workshop.findById(id);
    if (!workshop) {
      return NextResponse.json({ error: "Workshop not found" }, { status: 404 });
    }

    workshop.certificateWorkshopName = certWorkshopName;
    workshop.certificateDuration = certDuration;
    await workshop.save();

    const totalLecturesWithQuiz = workshop.lectures.filter(l => l.quiz && l.quiz.length > 0).length;
    
    // Only get specific regIds if provided, else get all
    const query = { workshopId: id };
    const { regIds } = body;
    if (regIds && Array.isArray(regIds) && regIds.length > 0) {
      query._id = { $in: regIds };
    }

    const registrations = await WorkshopRegistration.find(query);
    let generatedCount = 0;

    for (const reg of registrations) {
      // Calculate how many quizzes the student has passed
      let passedQuizzes = 0;
      if (reg.progress && reg.progress.length > 0) {
        for (const p of reg.progress) {
          if (p.quizPassed) {
            passedQuizzes++;
          }
        }
      }

      let newType = 'NONE';
      if (totalLecturesWithQuiz > 0 && passedQuizzes === totalLecturesWithQuiz) {
        newType = 'COMPLETION';
      } else if (passedQuizzes >= 2) {
        newType = 'PARTICIPATION';
      } else if (regIds && regIds.length > 0) {
        // Allow explicit publishing (via checkboxes or individual button) to bypass eligibility for testing
        newType = 'PARTICIPATION';
      }

      if (newType !== 'NONE') {
        reg.certificateType = newType;
        reg.certificateGeneratedAt = new Date();
        await reg.save();
        generatedCount++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Generated certificates for ${generatedCount} students.`,
      generatedCount
    });

  } catch (error) {
    console.error("Error generating certificates:", error);
    return NextResponse.json({ error: "Failed to generate certificates", details: error.message }, { status: 500 });
  }
}
