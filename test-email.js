require('dotenv').config({ path: '.env.local' });
const nodemailer = require('nodemailer');

async function testMail() {
  console.log("Checking SMTP credentials from .env.local...");
  
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.error("❌ ERROR: SMTP_EMAIL or SMTP_PASSWORD is not set in .env.local!");
    process.exit(1);
  }

  console.log("Credentials found. Attempting to verify connection...");

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify connection configuration
    await transporter.verify();
    console.log("✅ SUCCESS: Server is ready to take our messages!");
    
    console.log("Attempting to send a test email to:", process.env.SMTP_EMAIL);
    const info = await transporter.sendMail({
      from: `"DevAgile Tester" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL, // Send to themselves
      subject: "Test Email from DevAgile",
      text: "If you are reading this, your email configuration is working perfectly!",
    });
    
    console.log("✅ Test email sent successfully! Message ID:", info.messageId);

  } catch (error) {
    console.error("❌ ERROR during verification or sending:");
    console.error(error);
  }
}

testMail();
