import { Category } from "@/models";
import { param, ValidationChain } from "express-validator";

const getSingleByAdminValidator = (): ValidationChain[] => {
  return [
    param("slug")
      .trim()
      .notEmpty()
      .withMessage("Blogs cateogry slug is required")
      .bail()
      .custom(async (value: string) => {
        const category = await Category.findOne({
          where: { slug: value },
        });

        if (!category) {
          throw new Error("Blogs category not found");
        }

        return true;
      })
      .bail(),
  ];
};

export default getSingleByAdminValidator;
