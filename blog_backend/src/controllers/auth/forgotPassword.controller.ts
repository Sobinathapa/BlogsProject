import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@/models";
import { ApiError, ApiResponse } from "@/utils";
import { sendEmail } from "@/utils/mailer"; // email utility

function generateRandomPassword(length: number = 10): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$";
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError({
      status: 400,
      message: "Email is required",
    });
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new ApiError({
      status: 404,
      message: "User not found with this email",
    });
  }

  const newPassword = generateRandomPassword();
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  await sendEmail({
    to: email,
    subject: "Your New Password",
    html: `
      <p>Hello ${user.fullName},</p>
      <p>Your new password is: <strong>${newPassword}</strong></p>
      <p>Please change it after logging in.</p>
    `,
  });

  new ApiResponse({
    status: 200,
    message: "A new password has been sent to your email.",
  }).send(res);
};

export default forgotPassword;
