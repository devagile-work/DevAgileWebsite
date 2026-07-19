import nodemailer from 'nodemailer';

export const sendWelcomeEmail = async (userEmail, userName, courseName) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

    let whatsappLink = "";
    const titleToCheck = (courseName || "").toLowerCase();
    
    if (titleToCheck.includes("web") || titleToCheck.includes("full stack") || titleToCheck.includes("fsd")) {
      whatsappLink = "https://chat.whatsapp.com/DiSj04OhGaF6mcT9Ma05fQ?s=sw&p=a&ilr=0&amv=3";
    } else if (titleToCheck.includes("ai") || titleToCheck.includes("machine") || (titleToCheck.includes("data") && !titleToCheck.includes("structure"))) {
      whatsappLink = "https://chat.whatsapp.com/DncMpZ9vHrt2aNzQmtPZfn";
    }

    const whatsappHtml = whatsappLink ? `
      <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
        Please join our official WhatsApp group for important announcements, discussions, and support from your mentors and peers.
      </p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${whatsappLink}" style="background-color: #25D366; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; display: inline-block;">Join WhatsApp Group</a>
      </div>
    ` : '';

    const mailOptions = {
      from: `"DevAgile" <${process.env.SMTP_EMAIL || 'mail@devagile.work'}>`,
      to: userEmail,
      subject: `Welcome to ${courseName}! 🚀`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #0f172a; padding: 40px 30px; text-align: center;">
            <h1 style="color: #22d3ee; margin: 0; font-size: 32px; letter-spacing: -0.5px;">DevAgile</h1>
          </div>
          <div style="padding: 40px 30px; background-color: #ffffff; color: #334155;">
            <h2 style="color: #0f172a; margin-top: 0; font-size: 24px;">Welcome aboard, ${userName}!</h2>
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
              Thank you for enrolling in <strong>${courseName}</strong>! Your payment was successful and your course material is now fully unlocked.
            </p>
            ${whatsappHtml}
            <p style="font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
              You can now access all video sessions and resources directly from your learning dashboard.
            </p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${baseUrl}/dashboard" style="background-color: #22d3ee; color: #0f172a; text-decoration: none; padding: 16px 32px; font-weight: bold; border-radius: 8px; font-size: 16px; display: inline-block; box-shadow: 0 4px 14px 0 rgba(34, 211, 238, 0.39);">Start Learning Now</a>
            </div>
            <p style="font-size: 15px; line-height: 1.6; color: #64748b; margin-top: 32px;">
              If you have any questions or need support, simply reply to this email. We're here to help you succeed.
            </p>
          </div>
          <div style="background-color: #f8fafc; padding: 24px; text-align: center; font-size: 13px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
            &copy; ${new Date().getFullYear()} DevAgile. All rights reserved.
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
};
