const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {

    console.log("================================");
    console.log("SEND EMAIL FUNCTION CALLED");
    console.log("TO:", to);
    console.log("SUBJECT:", subject);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "***configured***" : "NOT SET");
    console.log("================================");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    console.log("📧 Transporter created, sending email...");

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("✅ EMAIL SENT SUCCESSFULLY");
    console.log("Message ID:", info.messageId);

    return true;

  } catch (error) {

    console.error("❌ EMAIL ERROR");
    console.error("Error Code:", error.code);
    console.error("Error Message:", error.message);
    console.error("Full Error:", error);

    return false;
  }
};

module.exports = sendEmail;