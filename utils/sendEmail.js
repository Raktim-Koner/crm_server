const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "payalroy2004@gmail.com",
    pass: "aqlq ttxr oqpx duyy"
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: "payalroy2004@gmail.com",
      to: to,
      subject: subject,
      text: text
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email error:", error);
  }
};

module.exports = sendEmail;