import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { Category, User } from "@/models";

interface IBlog {
  id?: number;
  title: string;
  slug: string;
  content: string;
  createdById: number;
  categoryId: number;
  featuredImage?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  underscored: true,
  timestamps: true,
})
class Blog extends Model<IBlog, Optional<IBlog, "id">> {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.BIGINT })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  slug!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  featuredImage?: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  createdById!: number;

  @BelongsTo(() => User)
  createdBy!: User;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;
}

export default Blog;
