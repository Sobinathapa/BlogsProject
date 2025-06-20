import { Category } from "@/models";
import { ApiResponse } from "@/utils";
import { generateUniqueSlug } from "@/utils/helper";
import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
  const { title } = req.body;

  const slug = await generateUniqueSlug({
    model: Category,
    text: title,
  });

  const blogCategory = await Category.create({
    title,
    slug,
  });

  new ApiResponse({
    status: 201,
    message: "Blog category created successfully",
    data: blogCategory,
  }).send(res);
};

export default create;
