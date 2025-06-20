import { Blog } from "@/models";
import { ApiResponse } from "@/utils";
import { generateUniqueSlug } from "@/utils/helper";
import { Request, Response } from "express";

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content, categoryId } = req.body;

  let slug;
  if (title) {
    slug = await generateUniqueSlug({
      model: Blog,
      text: title,
    });
  }

  // Check if a file was uploaded by multer middleware
  const featuredImage = req.file ? req.file.filename : undefined;

  // Prepare update object dynamically
  const updateData: any = {
    title,
    slug,
    content,
    categoryId,
  };

  // Only add featuredImage if a new file was uploaded
  if (featuredImage) {
    updateData.featuredImage = featuredImage;
  }

  await Blog.update(updateData, {
    where: { id },
  });

  const updatedBlog = await Blog.findByPk(id);

  new ApiResponse({
    status: 200,
    message: "Blog updated successfully",
    data: updatedBlog,
  }).send(res);
};

export default update;
