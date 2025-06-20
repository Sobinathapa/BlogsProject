import { Blog } from "@/models";
import { param, ValidationChain } from "express-validator";

const getSingleValidator = (): ValidationChain[] => {
  return [
    param("slug")
      .trim()
      .notEmpty()
      .withMessage("Blog slug is required")
      .bail()
      .custom(async (value: string) => {
        const blog = await Blog.findOne({
          where: { slug: value },
        });

        if (!blog) {
          throw new Error("Blog not found");
        }

        return true;
      })
      .bail(),
  ];
};

export default getSingleValidator;
