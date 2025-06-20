import { User } from "@/models";
import { ApiError } from "@/utils";
import { Request, Response, NextFunction } from "express";

const checkUserRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user: User | undefined = req.user;

    if (!user || !user.role || !user.role.title) {
      throw new ApiError({
        status: 403,
        message: "Forbidden",
        errors: [
          {
            role: `User role is missing or invalid`,
          },
        ],
        stack: `User or user role not found on request`,
      });
    }

    const role = user.role.title.toLowerCase();
    const allowedRoles = roles.map((r) => r.toLowerCase());

    if (!allowedRoles.includes(role)) {
      throw new ApiError({
        status: 403,
        message: "Forbidden",
        errors: [
          {
            role: `You don't have permission to access this resource`,
          },
        ],
        stack: `User role: ${user.role.title} is not allowed to access this resource`,
      });
    }

    next();
  };
};

export default checkUserRole;
