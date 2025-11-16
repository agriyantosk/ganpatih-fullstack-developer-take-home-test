// models/users.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  Default,
  Unique,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
} from "sequelize-typescript";

import { Post } from "./posts.model";
import { Follow } from "./follows.model";
import { IUser } from "../../types/interfaces/interface.user";

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class User extends Model<IUser> implements IUser {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, field: "id" })
  declare id: string;

  @Unique
  @Column({ type: DataType.STRING, allowNull: false, field: "username" })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "password_hash",
  })
  password_hash!: string;

  @CreatedAt
  @Column({ field: "created_at" })
  created_at!: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updated_at!: Date;

  @DeletedAt
  @Column({ field: "deleted_at" })
  deleted_at!: Date;

  @HasMany(() => Post)
  posts?: Post[];

  @HasMany(() => Follow, { foreignKey: "follower_id" })
  following?: Follow[];

  @HasMany(() => Follow, { foreignKey: "followee_id" })
  followers?: Follow[];
}
