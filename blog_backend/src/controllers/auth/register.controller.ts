import { EmailVerification, User } from "@/models";
import { sendEmail } from "@/services";
import { ApiResponse } from "@/utils";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const register = async (req: Request, res: Response) => {
  const { email, fullName, password, roleId } = req.body;

  
  const allowedRoleIds = [1, 2];
  const safeRoleId = allowedRoleIds.includes(Number(roleId))
    ? Number(roleId)
    : 2;

  const user = await User.create({
    email,
    fullName,
    password,
    roleId: safeRoleId,
  });

  // send verification email
  const token = uuidv4();
  const expiryDate = new Date(new Date().getTime() + 5 * 60 * 1000); // 5 minutes

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
  } catch {
    console.error("Error sending email:");
  }

  new ApiResponse({
    status: 201,
    message: "User registered successfully",
    data: user,
  }).send(res);
};

export default register;
