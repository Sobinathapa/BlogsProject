import { RefreshToken, User } from "@/models";
import { ApiResponse } from "@/utils";
import { Request, Response } from "express";

const logoutAll = async (req: Request, res: Response): Promise<void> => {
  const user: User = req.user!;

  await RefreshToken.destroy({
    where: {
      userId: user.id,
    },
  });

  new ApiResponse({
    status: 200,
    message: "Logout successful",
  }).send(res);
};

export default logoutAll;
