import { ApiResponse } from "@/utils";
import { Request, Response } from "express";

const getProfile = async (req: Request, res: Response): Promise<void> => {
  const user = req.user!;

  new ApiResponse({
    status: 200,
    message: "User profile",
    data: user,
  }).send(res);
};

export default getProfile;
