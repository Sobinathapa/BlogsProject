import { Blog } from "@/models";
import { ApiResponse } from "@/utils";
import { Request, Response } from "express";

const getSingleByAdmin = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  const blog = await Blog.findOne({
    where: { id },
    attributes: [
      "id",
      "title",
      "slug",
      "content",
      "featuredImage",
      "createdAt",
      "updatedAt",
      "categoryId",
    ],
  });

  if (!blog) {
    new ApiResponse({
      status: 404,
      message: "Blog not found",
    }).send(res);
    return;
  }

  new ApiResponse({
    status: 200,
    message: "Blog retrieved successfully",
    data: blog,
  }).send(res);
};

export default getSingleByAdmin;
