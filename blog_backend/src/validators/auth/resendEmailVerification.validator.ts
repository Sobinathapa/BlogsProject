import { EmailVerification, User } from "@/models";
import { body, ValidationChain } from "express-validator";
import { Op } from "sequelize";

const resendEmailVerificationValidatior = (): ValidationChain[] => {
  return [
    body("email")
      .exists()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is not valid")
      .bail()
      .custom(async (value, { req }) => {
        const user = await User.findOne({
          where: {
            email: value,
          },
        });

        if (!user) {
          return Promise.reject("User not found");
        }

        if (user.isEmailVerified) {
          return Promise.reject("Email already verified");
        }

        // get email verifications in last 24 hours
        const emailVerifications = await EmailVerification.findAll({
          where: {
            userId: user.id,
            createdAt: {
              [Op.gte]: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            },
          },

          order: [["createdAt", "DESC"]],
        });

        // check if there are more than 5 verifications in last 24 hours
        if (emailVerifications.length >= 5) {
          return Promise.reject(
            "You have reached the maximum number of verification emails in the last 24 hours"
          );
        }

        // check if there is a verification email in last 5 minutes
        const lastEmailVerification = emailVerifications[0];

        if (lastEmailVerification) {
          const now = new Date();
          const diff =
            now.getTime() - lastEmailVerification.createdAt.getTime();

          if (diff < 5 * 60 * 1000) {
            return Promise.reject(
              "You have already requested a verification email in the last 5 minutes"
            );
          }
        }

        req.user = user;
      }),
  ];
};

export default resendEmailVerificationValidatior;
