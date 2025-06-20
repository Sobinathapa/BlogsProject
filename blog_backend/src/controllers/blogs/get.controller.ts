import { Blog } from "@/models";
import { ApiResponse } from "@/utils";
import {
  decodeGetQuery,
  getPagination,
  getPagingData,
} from "@/utils/paginationUtil";
import { Request, Response } from "express";
import { Op } from "sequelize";

const get = async (req: Request, res: Response) => {
  const { page, size, search, sortBy, orderBy } = decodeGetQuery(req.query);
  const { limit, offset } = getPagination({ page, size });

  const whereCondition: any = {};

  if (search) {
    whereCondition[Op.or] = [
      {
        title: {
          [Op.like]: `%${search}%`,
        },
      },
    ];
  }

  const paginatedData = await Blog.findAndCountAll({
    attributes: [
      "id",
      "title",
      "slug",
      "featuredImage",
      "createdAt",
      "content",
    ],
    where: whereCondition,
    order: [[sortBy, orderBy]],
    limit,
    offset,
  });

  const response = getPagingData({
    paginatedData,
    page,
    limit,
  });

  new ApiResponse({
    status: 200,
    message: "Blogs fetched successfully",
    data: response,
  }).send(res);
};

export default get;
