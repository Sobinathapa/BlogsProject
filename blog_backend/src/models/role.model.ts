import { Optional } from "sequelize";
import {
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { User } from "@/models";

interface IRole {
  id?: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  underscored: true,
  timestamps: true,
})
class Role extends Model<IRole, Optional<IRole, "id">> {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.BIGINT })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  title!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @HasMany(() => User)
  users!: User[];
}

export default Role;
