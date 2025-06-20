import { Category } from "@/models";
import { body, ValidationChain } from "express-validator";
import { Op } from "sequelize";

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
      .bail()
      .custom(async (value) => {
        const blogCategory = await Category.findOne({
          where: {
            title: {
              [Op.in]: [value, value.toLowerCase(), value.toUpperCase()],
            },
          },
        });

        if (blogCategory) {
          return Promise.reject("Title already exists");
        }

        return true;
      })
      .bail(),
  ];
};

export default createValidator;
