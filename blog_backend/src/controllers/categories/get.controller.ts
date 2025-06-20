import { Category } from "@/models";
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

  const query: any = {
    attributes: ["id", "title", "slug"],
  };

  const orderCondition = [[sortBy, orderBy]];
  query.where = whereCondition;
  query.order = orderCondition;
  query.limit = limit;
  query.offset = offset;

  const paginatedData = await Category.findAndCountAll(query);

  const response = getPagingData({
    paginatedData,
    page,
    limit,
  });

  new ApiResponse({
    status: 200,
    message: "Blog Categories fetched successfully",
    data: response,
  }).send(res);
};

export default get;
