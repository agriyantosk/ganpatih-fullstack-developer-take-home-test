// models/follows.ts
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

@Table({
  tableName: "follows",
  timestamps: true,
  paranoid: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class Follow extends Model<IFollow> implements IFollow {
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

  @BelongsTo(() => User, { foreignKey: "follower_id" })
  follower?: User;

  @BelongsTo(() => User, { foreignKey: "followee_id" })
  followee?: User;

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
