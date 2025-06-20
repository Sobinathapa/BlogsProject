import { Category } from "@/models";
import { param, ValidationChain } from "express-validator";

const destroyValidator = (): ValidationChain[] => {
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
  ];
};
export default destroyValidator;
