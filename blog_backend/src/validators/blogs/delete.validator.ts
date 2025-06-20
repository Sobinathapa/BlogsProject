import { Blog } from "@/models";
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
        const blog = await Blog.findByPk(value);

        if (!blog) {
          return Promise.reject("Blog not found");
        }

        return Promise.resolve();
      }),
  ];
};
export default destroyValidator;
