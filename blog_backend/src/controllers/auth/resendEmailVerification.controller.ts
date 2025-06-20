import { EmailVerification, User } from "@/models";
import { sendEmail } from "@/services";
import { ApiResponse } from "@/utils";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const resendEmailVerification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user: User = req.user!;

  // send verification email
  const token = uuidv4();
  const expiryDate = new Date(
    new Date().getTime() + 5 * 60 * 1000 // 5 minutes
  );

  await EmailVerification.create({
    userId: user.id,
    token,
    expiresAt: expiryDate,
  });

  try {
    await sendEmail({
      to: user.email,
      subject: "Email Verification",
      html: `<p>Click <a href="http://localhost:8000/api/v1/auth/verify/${token}">here</a> to verify your email.</p>`,
    });
  } catch (error) {
    console.error("Error sending email:", error);
  }

  new ApiResponse({
    status: 200,
    message: "Verification email sent successfully",
  }).send(res);
};

export default resendEmailVerification;
