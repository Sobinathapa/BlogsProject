import { Sequelize } from "sequelize-typescript";
import env from "@/config/env.config";
import { Dialect } from "sequelize";
import * as models from "@/models";

const sequelize = new Sequelize({
  database: env.DB_NAME,
  dialect: env.DB_DIALECT as Dialect,
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  models: Object.values(models),
});

export default sequelize;
