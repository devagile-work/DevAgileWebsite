import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import WorkshopRegistration from '@/models/WorkshopRegistration';
import nodemailer from 'nodemailer';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';

export async function POST(request, { params }) {
  try {
    const adminPassword = request.headers.get("x-admin-password");
    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { regIds, certWorkshopName, certDuration } = body; // Array of registration IDs

    if (!regIds || !Array.isArray(regIds) || regIds.length === 0) {
      return NextResponse.json({ error: "No students selected" }, { status: 400 });
    }

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    const workshop = await mongoose.model("Workshop").findById(id);

    const registrations = await WorkshopRegistration.find({
      _id: { $in: regIds },
      workshopId: id,
      certificateType: { $ne: 'NONE' }
    });

    if (registrations.length === 0) {
      return NextResponse.json({ error: "No eligible students found to email" }, { status: 404 });
    }

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 465,
      secure: true, // Use true for 465, false for other ports like 587
      auth: {
        user: process.env.SMTP_EMAIL || process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD || process.env.SMTP_PASS,
      },
    });

    let sentCount = 0;
    let errors = [];

    for (const reg of registrations) {
      try {
        // Generate PDF inline
        const templateName = reg.certificateType === 'COMPLETION' ? 'cert_completion.png' : 'cert_participation.png';
        const templatePath = path.join(process.cwd(), 'public', templateName);
        
        if (!fs.existsSync(templatePath)) {
          throw new Error(`Template not found: ${templateName}`);
        }

        const imageBytes = fs.readFileSync(templatePath);
        const pdfDoc = await PDFDocument.create();
        const image = await pdfDoc.embedPng(imageBytes);
        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });

        const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        // 1. Draw Name
        const name = reg.name || "Student";
        const nameSize = 48;
        const nameWidth = font.widthOfTextAtSize(name, nameSize);
        page.drawText(name, {
          x: (image.width / 2) - (nameWidth / 2),
          y: (image.height / 2) - 20,
          size: nameSize,
          font: font,
          color: rgb(0.1, 0.3, 0.6),
        });

        // 2. Draw Workshop Name
        const wName = certWorkshopName || workshop.certificateWorkshopName || workshop.title;
        const wNameSize = 16;
        const wNameWidth = font.widthOfTextAtSize(wName, wNameSize);
        page.drawText(wName, {
          x: (image.width / 2) - (wNameWidth / 2),
          y: (image.height / 2) - 100,
          size: wNameSize,
          font: font,
          color: rgb(0.2, 0.2, 0.2),
        });

        // 3. Draw Duration
        const duration = certDuration || workshop.certificateDuration || "";
        const durSize = 16;
        page.drawText(duration, {
          x: (image.width / 2) - 100,
          y: (image.height / 2) - 150,
          size: durSize,
          font: regularFont,
          color: rgb(0.2, 0.2, 0.2),
        });

        const pdfBuffer = Buffer.from(await pdfDoc.save());

        // Set dynamic email content based on certificate type
        const isCompletion = reg.certificateType === 'COMPLETION';
        const subject = isCompletion 
          ? "Congratulations! Your DevAgile Certificate of Completion is Here" 
          : "Thank you! Your DevAgile Certificate of Participation is Here";
        
        const textBody = isCompletion
          ? `Hi ${reg.name},\n\nCongratulations on successfully completing your workshop! Please find your Certificate of Completion attached.\n\nBest regards,\nDevAgile Team`
          : `Hi ${reg.name},\n\nThank you for participating in our workshop! Please find your Certificate of Participation attached.\n\nBest regards,\nDevAgile Team`;
          
        const htmlBody = isCompletion
          ? `<p>Hi ${reg.name},</p><p>Congratulations on successfully completing your workshop! Please find your <b>Certificate of Completion</b> attached to this email.</p><p>Best regards,<br/>DevAgile Team</p>`
          : `<p>Hi ${reg.name},</p><p>Thank you for participating in our workshop! Please find your <b>Certificate of Participation</b> attached to this email.</p><p>Best regards,<br/>DevAgile Team</p>`;

        // Send Email
        const mailOptions = {
          from: `"DevAgile" <${process.env.SMTP_EMAIL || process.env.SMTP_USER}>`,
          to: reg.userEmail,
          subject: subject,
          text: textBody,
          html: htmlBody,
          attachments: [
            {
              filename: `${reg.name.replace(/\s+/g, '_')}_Certificate.pdf`,
              content: pdfBuffer,
              contentType: 'application/pdf'
            }
          ]
        };

        await transporter.sendMail(mailOptions);
        
        reg.certificateSentAt = new Date();
        await reg.save();
        sentCount++;
      } catch (err) {
        console.error(`Error sending email to ${reg.userEmail}:`, err);
        errors.push({ email: reg.userEmail, error: err.message });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Sent ${sentCount} emails.`,
      sentCount,
      errors
    });

  } catch (error) {
    console.error("Error sending certificates email:", error);
    return NextResponse.json({ error: "Failed to send emails", details: error.message }, { status: 500 });
  }
}
