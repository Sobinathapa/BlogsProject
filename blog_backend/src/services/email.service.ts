import nodemailer from "nodemailer";
import env from "@/config/env.config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GOOGLE_APP_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

const sendEmail = async ({
  to,
  subject,
  text = "",
  html = "",
}: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}) => {
  if (!to || !subject) {
    throw new Error("Recipient email and subject are required");
  }

  if (!process.env.GOOGLE_APP_EMAIL || !process.env.GOOGLE_APP_PASSWORD) {
    throw new Error("Email service credentials are not configured");
  }

  if (!html && !text) {
    throw new Error("Either text or HTML content must be provided");
  }

  if (html && text) {
    throw new Error("Provide either text or HTML content, not both");
  }

  try {
    const mailOptions = {
      from: `MERN BLOG <forkhakitech@gmail.com>`,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
