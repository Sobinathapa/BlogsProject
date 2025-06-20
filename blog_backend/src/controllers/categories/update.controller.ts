import { Category } from "@/models";
import { ApiResponse } from "@/utils";
import { generateUniqueSlug } from "@/utils/helper";
import { Request, Response } from "express";

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;

  let slug;

  if (title) {
    slug = await generateUniqueSlug({
      model: Category,
      text: title,
    });
  }

  await Category.update(
    {
      title,
      slug,
    },
    {
      where: {
        id: id,
      },
    }
  );

  const updatedBlogCategory = await Category.findByPk(id);

  new ApiResponse({
    status: 200,
    message: "Blog category updated successfully",
    data: updatedBlogCategory,
  }).send(res);
};

export default update;
