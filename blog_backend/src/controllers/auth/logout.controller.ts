import { RefreshToken } from "@/models";
import { ApiError, ApiResponse } from "@/utils";
import { getAuthToken, verifyToken } from "@/utils/jwtUtils";
import { Request, Response } from "express";

const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = getAuthToken({ req });

    const decodedToken = await verifyToken({ token: token! });

    if (!decodedToken) {
      throw new ApiError({
        status: 401,
        message: "Unauthorized",
        errors: [
          {
            token: "Token not valid",
          },
        ],
        stack: "Token not valid",
      });
    }

    await RefreshToken.destroy({
      where: {
        id: decodedToken.refreshTokenId,
      },
    });

    new ApiResponse({
      status: 200,
      message: "Logout successful",
    }).send(res);
  } catch {
    throw new ApiError({
      status: 500,
      message: "Internal Server Error",
    });
  }
};

export default logout;
