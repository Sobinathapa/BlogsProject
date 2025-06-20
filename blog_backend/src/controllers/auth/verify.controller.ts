/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { EmailVerification, User } from "@/models";
import { Request, Response } from "express";
const verify = async (req: Request, res: Response) => {
  const emailVerification: EmailVerification = req.emailVerification;
  const user = await User.findByPk(emailVerification.userId);

  //   if (!user) {
  //     throw new ApiError({
  //       status: 404,
  //       message: "User not found",
  //     });
  //   }

  emailVerification.verifiedAt = new Date();
  await emailVerification.save();

  user!.isEmailVerified = true;
  await user!.save();

  res.redirect("https://softup.io");
};

export default verify;
