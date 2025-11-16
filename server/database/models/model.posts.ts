// models/posts.ts
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  ForeignKey,
  BelongsTo,
  Default,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from "sequelize-typescript";

import { User } from "./model.users";
import { IPost } from "../../types/interfaces/interface.post";

@Table({
  tableName: "posts",
  timestamps: true,
  paranoid: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class Post extends Model<IPost> implements IPost {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column({ type: DataType.UUID, field: "id" })
  declare id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: "user_id",
  })
  user_id!: string;

  @BelongsTo(() => User, { foreignKey: "user_id" })
  user?: User;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    field: "content",
  })
  content!: string;

  @CreatedAt
  @Column({ field: "created_at" })
  created_at!: Date;

  @UpdatedAt
  @Column({ field: "updated_at" })
  updated_at!: Date;

  @DeletedAt
  @Column({ field: "deleted_at" })
  deleted_at!: Date;
}
