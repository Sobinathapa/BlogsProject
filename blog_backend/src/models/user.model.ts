import { Optional } from "sequelize";
import {
  BeforeCreate,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import { EmailVerification, Role } from "@/models";
import bcrypt from "bcrypt";

interface IUser {
  id?: number;
  email: string;
  fullName: string;
  password: string;
  avatar?: string;
  roleId: number;
  isEmailVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

@Table({
  underscored: true,
  timestamps: true,
})
class User extends Model<IUser, Optional<IUser, "id">> {
  @Column({ autoIncrement: true, primaryKey: true, type: DataType.BIGINT })
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  fullName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar?: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isEmailVerified!: boolean;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  roleId!: number;

  @BelongsTo(() => Role)
  role!: Role;

  @HasMany(() => EmailVerification)
  emailVerifications!: EmailVerification[];

  @BeforeCreate
  static async hashPassword(instance: User): Promise<void> {
    if (instance.changed("password")) {
      instance.password = await bcrypt.hash(instance.password, 10);
    }
  }

  public async isPasswordValid(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

export default User;
