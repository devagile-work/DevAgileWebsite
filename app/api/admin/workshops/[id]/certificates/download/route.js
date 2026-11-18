import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import WorkshopRegistration from '@/models/WorkshopRegistration';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function GET(request, { params }) {
  try {
    const adminPassword = request.headers.get("x-admin-password");
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const url = new URL(request.url);
    const regId = url.searchParams.get('regId');

    if (!regId) {
      return NextResponse.json({ error: "Missing regId" }, { status: 400 });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const reg = await WorkshopRegistration.findById(regId);
    if (!reg || reg.workshopId.toString() !== id) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    const workshop = await mongoose.model("Workshop").findById(id);

    if (reg.certificateType === 'NONE' || !reg.certificateType) {
      return NextResponse.json({ error: "No certificate generated for this user" }, { status: 400 });
    }

    const certType = reg.certificateType;

    // Load template image
    const templateName = certType === 'COMPLETION' ? 'cert_completion.png' : 'cert_participation.png';
    const templatePath = path.join(process.cwd(), 'public', templateName);
    
    if (!fs.existsSync(templatePath)) {
       return NextResponse.json({ error: "Certificate template not found" }, { status: 500 });
    }

    const imageBytes = fs.readFileSync(templatePath);

    // Create PDF
    const pdfDoc = await PDFDocument.create();
    const image = await pdfDoc.embedPng(imageBytes);
    
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });

    // Embed font
    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    // 1. Draw Name
    const name = reg.name || "Student";
    const nameSize = 48;
    const nameWidth = font.widthOfTextAtSize(name, nameSize);
    page.drawText(name, {
      x: (image.width / 2) - (nameWidth / 2) ,
      y: (image.height / 2) - 20 , // Adjusted higher
      size: nameSize,
      font: font,
      color: rgb(0.1, 0.3, 0.6), // dark blue
    });

    // 2. Draw Workshop Name
    const wNameParam = url.searchParams.get('wName');
    const wName = wNameParam || workshop.certificateWorkshopName || workshop.title;
    const wNameSize = 16;
    const wNameWidth = font.widthOfTextAtSize(wName, wNameSize);
    page.drawText(wName, {
      x: (image.width / 2) - (wNameWidth / 2),
      y: (image.height / 2) - 100, // Adjusted higher based on new layout
      size: wNameSize,
      font: font,
      color: rgb(0.2, 0.2, 0.2),
    });

    // 3. Draw Duration
    const durationParam = url.searchParams.get('duration');
    const duration = durationParam || workshop.certificateDuration || "";
    const durSize = 16;
    page.drawText(duration, {
      x: (image.width / 2) - 100, // Place after "during "
      y: (image.height / 2) - 150, // Adjusted to match the blank line
      size: durSize,
      font: regularFont,
      color: rgb(0.2, 0.2, 0.2),
    });

    const pdfBytes = await pdfDoc.save();

    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `inline; filename="${name}_Certificate.pdf"`,
      },
    });

  } catch (error) {
    console.error("Error downloading certificate:", error);
    return NextResponse.json({ error: "Failed to download certificate", details: error.message }, { status: 500 });
  }
}
