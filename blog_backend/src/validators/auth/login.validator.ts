import { body, ValidationChain } from "express-validator";

const loginValidator = (): ValidationChain[] => {
  return [
    body("email")
      .exists()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email is not valid")
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

export default loginValidator;
