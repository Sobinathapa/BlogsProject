import { Category } from "@/models";
import { body, ValidationChain } from "express-validator";

const createValidator = (): ValidationChain[] => {
  return [
    body("title")
      .exists()
      .withMessage("Title is required")
      .bail()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty")
      .bail()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long")
      .bail(),
    body("content")
      .exists()
      .withMessage("Content is required")
      .bail()
      .trim()
      .notEmpty()
      .withMessage("Content cannot be empty")
      .bail()
      .isLength({ min: 15 })
      .withMessage("Content must be at least 15 characters long")
      .bail(),
    body("categoryId")
      .exists()
      .withMessage("Category is required")
      .bail()
      .isNumeric()
      .withMessage("Category must be a number")
      .bail()
      .custom(async (value) => {
        const category = await Category.findByPk(value);
        if (!category) {
          return Promise.reject("Category not found");
        }

        return Promise.resolve();
      }),
  ];
};

export default createValidator;
