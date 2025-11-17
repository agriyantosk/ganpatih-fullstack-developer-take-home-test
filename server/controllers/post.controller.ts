import { Request, Response, NextFunction } from "express";
import { Post } from "../database/models/posts.model";
import { User } from "../database/models/users.model";
import { Follow } from "../database/models/follows.model";
import { sendSuccess } from "../utils/responseHandler";
import { throwError } from "../utils/responseHandler";
import { IPostWithUser } from "../types/interfaces/interface.post";
import { Sequelize } from "sequelize";

const postController = {
  getFeed: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUserId = (req as any).user.id;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;

      const followRecords = await Follow.findAll({
        where: { follower_id: authUserId },
        attributes: ["followee_id"],
        raw: true,
      });

      const followingIds = new Set(
        followRecords.map((f: any) => f.followee_id)
      );

      const { rows, count } = await Post.findAndCountAll({
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
        ],
        order: [Sequelize.literal("RANDOM()")],
        limit,
        offset,
      });

      const posts = rows.map(
        (row) => row.get({ plain: true }) as unknown as IPostWithUser
      );

      const formatted = posts.map((p) => {
        const user = p.user;
        const is_following = user ? followingIds.has(user.id) : false;

        return {
          id: p.id,
          content: p.content,
          created_at: p.created_at,
          user: user
            ? {
                id: user.id,
                username: user.username,
                is_following,
              }
            : null,
        };
      });

      return sendSuccess(
        res,
        {
          page,
          total: count,
          posts: formatted,
        },
        200
      );
    } catch (err) {
      next(err);
    }
  },

  createPost: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUserId = (req as any).user.id;
      const { content } = req.body;

      if (!content || content.trim() === "") {
        throwError("content is required", 400);
      }

      const newPost = await Post.create({
        user_id: authUserId,
        content,
      });

      return sendSuccess(
        res,
        {
          id: newPost.id,
          user_id: authUserId,
          content: newPost.content,
          created_at: newPost.created_at,
        },
        201
      );
    } catch (err) {
      next(err);
    }
  },
};

export default postController;
