import { RefreshToken, Role, User } from "@/models";
import { ApiError } from "@/utils";
import { getAuthToken, verifyToken } from "@/utils/jwtUtils";
import { NextFunction, Request, Response } from "express";

const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = getAuthToken({ req });

    // check if token exists
    if (!token) {
      throw new ApiError({
        status: 401,
        message: "Unauthorized",
        errors: [
          {
            token: "Token not found",
          },
        ],
        stack: "Token not found",
      });
    }

    const decodedToken = verifyToken({ token });

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

    const refreshToken = await RefreshToken.findByPk(
      decodedToken!.refreshTokenId
    );

    if (!refreshToken) {
      throw new ApiError({
        message: "Invalid token",
        status: 401,
        errors: [
          {
            token: "Invalid token",
          },
        ],
      });
    }

    // verify refresh token
    await verifyToken({ token: refreshToken.token });

    if (refreshToken.isExpired) {
      throw new ApiError({
        message: "Invalid token",
        status: 401,
        errors: [
          {
            token: "Token expired",
          },
        ],
      });
    }

    // check if refresh token is expired
    if (refreshToken.expiresAt < new Date()) {
      throw new ApiError({
        message: "Invalid token",
        status: 401,
        errors: [
          {
            token: "Token expired",
          },
        ],
      });
    }

    const user = await User.findByPk(decodedToken!.userId, {
      attributes: ["id", "email", "fullName", "isEmailVerified", "avatar"],
      include: [
        {
          model: Role,
          attributes: ["id", "title"],
        },
      ],
    });

    if (!user) {
      throw new ApiError({
        message: "User not found",
        status: 401,
        errors: [
          {
            token: "User not found",
          },
        ],
      });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }

    next(
      new ApiError({
        status: 401,
        message: "Unauthorized",
      })
    );
  }
};

export default auth;
