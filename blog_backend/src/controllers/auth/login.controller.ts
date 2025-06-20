import { RefreshToken, Role, User } from "@/models";
import { ApiError, ApiResponse } from "@/utils";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwtUtils";
import { Request, Response } from "express";
import { JWT_REFRESH_EXPIRES_IN } from "@/utils/jwtUtils";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: { email },
    include: [
      {
        model: Role,
        attributes: ["id", "title"],
      },
    ],
  });

  if (!user) {
    throw new ApiError({
      status: 401,
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await user.isPasswordValid(password);

  if (!isPasswordValid) {
    throw new ApiError({
      status: 401,
      message: "Invalid email or password",
    });
  }

  if (!user.isEmailVerified) {
    throw new ApiError({
      status: 401,
      message: "Email not verified",
    });
  }

  //   Generate Refresh Token
  const refreshToken = await generateRefreshToken({
    payload: {
      userId: user.id,
    },
  });
  // Save Refresh Token to DB
  const createdRefreshToken = await RefreshToken.create({
    userId: user.id,
    token: refreshToken,
    expiresAt: new Date(
      new Date().getTime() + JWT_REFRESH_EXPIRES_IN * 60 * 1000
    ),
  });
  //   Generate Access Token with refresh token id in payload
  const accessToken = await generateAccessToken({
    payload: {
      userId: user.id,
      refreshTokenId: createdRefreshToken.id,
    },
  });
  //   Send Access Token and Refresh Token in response

  new ApiResponse({
    status: 200,
    message: "Login successful",
    data: {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        isEmailVerified: user.isEmailVerified,
        role: user.role,
      },
    },
  }).send(res);
};

export default login;
