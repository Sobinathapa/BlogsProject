import { Category } from "@/models";
import { body, param, ValidationChain } from "express-validator";
import { Op } from "sequelize";

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
        const blogCategory = await Category.findByPk(value);

        if (!blogCategory) {
          return Promise.reject("Blog Category not found");
        }

        return true;
      }),
    body("title")
      .optional()
      .trim()
      .notEmpty()
      .withMessage("Title cannot be empty")
      .bail()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters long")
      .bail()
      .custom(async (value, { req }) => {
        const blogCategory = await Category.findOne({
          where: {
            id: {
              [Op.not]: req.params!.id,
            },
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

export default updateValidator;
