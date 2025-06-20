import { Blog, Category } from "@/models";
import { body, param, ValidationChain } from "express-validator";

const updateValidator = (): ValidationChain[] => {
  return [
    param("id")
      .exists()
      .withMessage("ID is required")
      .bail()
      .isNumeric()
      .withMessage("ID must be a number")
      .bail()
      .custom(async (value) => {
        const event = await Blog.findByPk(value);

        if (!event) {
          return Promise.reject("Event not found");
        }

        return Promise.resolve();
      }),
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty")
      .bail()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long")
      .bail(),
    body("content")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Content cannot be empty")
      .bail()
      .isLength({ min: 15 })
      .withMessage("Content must be at least 15 characters long")
      .bail(),
    body("categoryId")
      .optional()
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

export default updateValidator;
