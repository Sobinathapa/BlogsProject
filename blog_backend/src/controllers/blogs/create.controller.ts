import { Blog } from "@/models";
import { ApiResponse } from "@/utils";
import { generateUniqueSlug } from "@/utils/helper";
import { Request, Response } from "express";

const create = async (req: Request, res: Response) => {
  const { title, content, categoryId } = req.body;

  const slug = await generateUniqueSlug({
    model: Blog,
    text: title,
  });
  const featuredImage = req.file ? req.file.filename : null;

  const blog = await Blog.create({
    title,
    content,
    categoryId,
    slug,
    featuredImage,
    createdById: req.user.id,
  } as Blog);
  new ApiResponse({
    status: 201,
    message: "Blog created successfully",
    data: blog,
  }).send(res);
};

export default create;
