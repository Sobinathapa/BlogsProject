import { Blog } from "@/models";
import { ApiResponse } from "@/utils";
import { Request, Response } from "express";

const getSingle = async (req: Request, res: Response) => {
  const { slug } = req.params;

  const query: any = {
    where: { slug },
    attributes: [
      "id",
      "title",
      "slug",
      "content",
      "featuredImage",
      "createdAt",
      "updatedAt",
    ],
  };

  const blog = await Blog.findOne(query);

  new ApiResponse({
    status: 200,
    message: "Blog retrieved successfully",
    data: blog,
  }).send(res);
};

export default getSingle;
