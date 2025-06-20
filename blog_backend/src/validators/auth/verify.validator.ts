import { EmailVerification } from "@/models";
import { param, ValidationChain } from "express-validator";

const verifyValidator = (): ValidationChain[] => {
  return [
    param("token")
      .exists()
      .withMessage("Token is required")
      .bail()
      .isString()
      .withMessage("Token must be a string")
      .bail()
      .isUUID("4")
      .withMessage("Invalid token format")
      .bail()
      .custom(async (value, { req }) => {
        const emailVerification = await EmailVerification.findOne({
          where: { token: value },
        });

        if (!emailVerification) {
          throw new Error("Invalid token");
        }

        if (emailVerification.verifiedAt) {
          throw new Error("Email already verified");
        }

        if (emailVerification.expiresAt < new Date()) {
          throw new Error("Token expired");
        }

        req.emailVerification = emailVerification;
      }),
  ];
};

export default verifyValidator;
