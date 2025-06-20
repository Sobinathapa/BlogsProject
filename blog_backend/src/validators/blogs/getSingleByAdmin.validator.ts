import { Blog } from "@/models";
import { param, ValidationChain } from "express-validator";

const getSingleByAdminValidator = (): ValidationChain[] => {
  return [
    param("id")
      .isInt({ gt: 0 })
      .withMessage("Blog ID must be a positive integer")
      .bail()
      .custom(async (value: number) => {
        const blog = await Blog.findByPk(value);
        if (!blog) {
          throw new Error("Blog not found");
        }
        return true;
      }),
  ];
};

export default getSingleByAdminValidator;
