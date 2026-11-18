const mongoose = require('mongoose');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config({path: '.env.local'});
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);
  const WorkshopRegistration = require('./models/WorkshopRegistration').default;
  const Workshop = require('./models/Workshop').default;

  const reg = await WorkshopRegistration.findOne({ userEmail: 'adarsh16221@gmail.com', certificateType: { $ne: 'NONE' } });
  if (!reg) {
    console.log('Registration not found or certificate not published yet for adarsh16221@gmail.com');
    process.exit(1);
  }

  const workshop = await Workshop.findById(reg.workshopId);

  const templateName = reg.certificateType === 'COMPLETION' ? 'cert_completion.png' : 'cert_participation.png';
  const templatePath = './public/' + templateName;
  const imageBytes = fs.readFileSync(templatePath);
  const pdfDoc = await PDFDocument.create();
  const image = await pdfDoc.embedPng(imageBytes);
  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const name = reg.name || 'Student';
  const nameSize = 48;
  const nameWidth = font.widthOfTextAtSize(name, nameSize);
  page.drawText(name, {
    x: (image.width / 2) - (nameWidth / 2),
    y: (image.height / 2) - 20,
    size: nameSize,
    font: font,
    color: rgb(0.1, 0.3, 0.6),
  });

  const wName = workshop.certificateWorkshopName || workshop.title;
  const wNameSize = 16;
  const wNameWidth = font.widthOfTextAtSize(wName, wNameSize);
  page.drawText(wName, {
    x: (image.width / 2) - (wNameWidth / 2),
    y: (image.height / 2) - 100,
    size: wNameSize,
    font: font,
    color: rgb(0.2, 0.2, 0.2),
  });

  const duration = workshop.certificateDuration || '';
  page.drawText(duration, {
    x: (image.width / 2) - 100,
    y: (image.height / 2) - 150,
    size: 16,
    font: regularFont,
    color: rgb(0.2, 0.2, 0.2),
  });

  const pdfBuffer = Buffer.from(await pdfDoc.save());

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"DevAgile" <' + process.env.SMTP_EMAIL + '>',
    to: reg.userEmail,
    subject: 'Congratulations! Your DevAgile Certificate is Here',
    text: 'Hi ' + reg.name + ',\n\nCongratulations on completing your workshop! Please find your certificate attached.\n\nBest regards,\nDevAgile Team',
    attachments: [
      {
        filename: reg.name.replace(/\s+/g, '_') + '_Certificate.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf'
      }
    ]
  };

  await transporter.sendMail(mailOptions);
  
  // mark as sent
  reg.certificateSentAt = new Date();
  await reg.save();

  console.log('Email sent successfully!');
  process.exit(0);
}
run();
