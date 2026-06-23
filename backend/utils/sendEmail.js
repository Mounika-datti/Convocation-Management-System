const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  try {

    console.log("================================");
    console.log("SEND EMAIL FUNCTION CALLED");
    console.log("TO:", to);
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log("================================");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    });

    console.log("EMAIL SENT SUCCESSFULLY");
    console.log(info.messageId);

    return true;

  } catch (error) {

    console.log("EMAIL ERROR");
    console.log(error);

    throw error;
  }
};

module.exports = sendEmail;