import { Optional } from "sequelize";
import {
  Column,
  CreatedAt,
  DataType,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";

interface ICategory {
  id?: number;
  title: string;
  slug: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  underscored: true,
  timestamps: true,
})
class Category extends Model<ICategory, Optional<ICategory, "id">> {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.BIGINT })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default Category;
