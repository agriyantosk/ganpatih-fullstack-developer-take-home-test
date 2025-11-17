import { Request, Response, NextFunction } from "express";
import { User } from "../database/models/users.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendSuccess, throwError } from "../utils/responseHandler";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;

const userController = {
  register: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        throwError("username and password required", 400);

      const exists = await User.findOne({ where: { username } });
      if (exists) throwError("username already exists", 409);

      const password_hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        password_hash,
      });

      sendSuccess(res, { id: newUser.id, username: newUser.username }, 201);
    } catch (err) {
      next(err);
    }
  },

  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password)
        throwError("username and password required", 400);

      const user = await User.findOne({ where: { username } });
      if (!user) throwError("invalid username or password", 401);

      const match = await bcrypt.compare(
        password,
        user.dataValues.password_hash
      );
      if (!match) throwError("invalid username or password", 401);

      const token = jwt.sign(
        { id: user.dataValues.id, username: user.dataValues.username },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { id: user.dataValues.id },
        REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );

      sendSuccess(res, { token, refreshToken }, 200);
    } catch (err) {
      next(err);
    }
  },

  refreshToken: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) throwError("refreshToken required", 400);

      jwt.verify(
        refreshToken,
        REFRESH_TOKEN_SECRET,
        (err: any, decoded: any) => {
          if (err) throwError("invalid refresh token", 401);

          const newAccessToken = jwt.sign(
            { id: decoded.id },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
          );
          sendSuccess(res, { token: newAccessToken }, 200);
        }
      );
    } catch (err) {
      next(err);
    }
  },

  me: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authUserId = (req as any).user?.id;
      if (!authUserId) throwError("unauthorized", 401);

      const user = await User.findByPk(authUserId, {
        attributes: ["id", "username", "created_at"],
      });

      if (!user) throwError("user not found", 404);

      return sendSuccess(res, user, 200);
    } catch (err) {
      next(err);
    }
  },
};

export default userController;
