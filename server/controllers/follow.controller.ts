import { Request, Response, NextFunction } from "express";
import { Follow } from "../database/models/follows.model";
import { User } from "../database/models/users.model";
import { sendSuccess } from "../utils/responseHandler";
import { throwError } from "../utils/responseHandler";

const followController = {
  follow: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const followerId = (req as any).user.id;
      const { user_id: followeeId } = req.params;

      if (followerId === followeeId) {
        throwError("cannot follow yourself", 400);
      }

      const target = await User.findByPk(followeeId);
      if (!target) {
        throwError("user not found", 404);
      }

      const existing = await Follow.findOne({
        where: { follower_id: followerId, followee_id: followeeId },
      });

      if (existing) {
        throwError("already following this user", 409);
      }

      await Follow.create({
        follower_id: followerId,
        followee_id: followeeId,
      });

      return sendSuccess(
        res,
        { message: `you are now following user ${followeeId}` },
        200
      );
    } catch (err) {
      next(err);
    }
  },

  unfollow: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const followerId = (req as any).user.id;
      const { user_id: followeeId } = req.params;

      const followRecord = await Follow.findOne({
        where: { follower_id: followerId, followee_id: followeeId },
      });

      if (!followRecord) {
        throwError("not following this user", 404);
      }

      await followRecord.destroy();

      return sendSuccess(
        res,
        { message: `you unfollowed user ${followeeId}` },
        200
      );
    } catch (err) {
      next(err);
    }
  },
};

export default followController;
