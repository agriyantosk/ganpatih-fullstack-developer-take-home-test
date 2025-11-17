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
import { IFollow } from "../../types/interfaces/interface.follow";

export interface IFollowCreationAttributes
  extends Omit<IFollow, "created_at" | "updated_at" | "deleted_at"> {}

@Table({
  tableName: "follows",
  timestamps: true,
  paranoid: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class Follow
  extends Model<IFollow, IFollowCreationAttributes>
  implements IFollow
{
  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: "follower_id",
  })
  follower_id!: string;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: "followee_id",
  })
  followee_id!: string;

  @CreatedAt
  @Column({ type: DataType.DATE, field: "created_at" })
  created_at!: Date;

  @UpdatedAt
  @Column({ type: DataType.DATE, field: "updated_at" })
  updated_at!: Date;

  @DeletedAt
  @Column({ type: DataType.DATE, field: "deleted_at" })
  deleted_at!: Date | null;

  @BelongsTo(() => User, { foreignKey: "follower_id" })
  follower?: User;

  @BelongsTo(() => User, { foreignKey: "followee_id" })
  followee?: User;
}

export default Follow;
