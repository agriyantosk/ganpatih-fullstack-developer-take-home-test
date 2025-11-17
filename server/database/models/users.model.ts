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

export interface IUserAttributes {
  id: string;
  username: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}

export interface IUserCreationAttributes {
  username: string;
  password_hash: string;
}

@Table({
  tableName: "users",
  timestamps: true,
  paranoid: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class User
  extends Model<IUserAttributes, IUserCreationAttributes>
  implements IUserAttributes
{
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
  @Column({ type: DataType.DATE, field: "created_at" })
  created_at!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  updated_at!: Date;

  @DeletedAt
  @Column({ type: DataType.DATE, field: "deleted_at" })
  deleted_at!: Date | null;

  @HasMany(() => Post)
  posts?: Post[];

  @HasMany(() => Follow, { foreignKey: "follower_id" })
  following?: Follow[];

  @HasMany(() => Follow, { foreignKey: "followee_id" })
  followers?: Follow[];
}

export default User;
