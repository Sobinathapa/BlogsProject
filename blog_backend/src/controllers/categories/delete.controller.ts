import { Category } from "@/models";
import { ApiResponse } from "@/utils";
import { Request, Response } from "express";

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Category.destroy({
    where: {
      id: id,
    },
  });

  new ApiResponse({
    status: 204,
    message: "Blog Category deleted successfully",
  }).send(res);
};

export default destroy;
