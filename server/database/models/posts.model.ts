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

import { User } from "./users.model";
import { IPost } from "../../types/interfaces/interface.post";

export interface IPostCreationAttributes
  extends Omit<IPost, "id" | "created_at" | "updated_at" | "deleted_at"> {}

@Table({
  tableName: "posts",
  timestamps: true,
  paranoid: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class Post
  extends Model<IPost, IPostCreationAttributes>
  implements IPost
{
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
  @Column({ type: DataType.DATE, field: "created_at" })
  created_at!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  updated_at!: Date;

  @DeletedAt
  @Column({ type: DataType.DATE, field: "deleted_at" })
  deleted_at!: Date | null;
}

export default Post;
