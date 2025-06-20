import { User } from "@/models";
import { body, ValidationChain } from "express-validator";

const registerValidator = (): ValidationChain[] => {
  return [
    body("email")
      .exists()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is not valid")
      .bail()
      .custom(async (value) => {
        const user = await User.findOne({
          where: { email: value },
        });

        if (user) {
          throw new Error("Email already in use");
        }

        return true;
      }),
    body("fullName")
      .exists()
      .withMessage("Full name is required")
      .bail()
      .isLength({ min: 3 })
      .withMessage("Full name must be at least 3 characters long")
      .bail(),
    body("password")
      .exists()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .bail(),
  ];
};

export default registerValidator;
