require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

(async () => {
  try {
    console.log("Verifying email transporter...");
    await transporter.verify();
    console.log("✓ Transporter verified successfully");

    console.log("\nSending test email...");
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "mounikadatti05@gmail.com",
      subject: "Test OTP Email",
      html: `
        <h2>Test OTP Email</h2>
        <p>Your OTP is:</p>
        <h1>123456</h1>
        <p>Valid for 10 minutes.</p>
      `,
    });

    console.log("✓ Email sent successfully!");
    console.log("Message ID:", info.messageId);
  } catch (error) {
    console.error("✗ Email Error:", error.message);
    console.error("Full error:", error);
  }
})();
