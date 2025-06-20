import { body, ValidationChain } from "express-validator";

const forgotPasswordValidator = (): ValidationChain[] => {
  return [
    body("email")
      .isEmail()
      .withMessage("A valid email is required")
      .normalizeEmail(),
  ];
};

export default forgotPasswordValidator;
