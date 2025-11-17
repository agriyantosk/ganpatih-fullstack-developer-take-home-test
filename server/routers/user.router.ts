import express from "express";
import userController from "../controllers/user.controller";
const userRouters = express.Router();

userRouters.post("/register", userController.register);
userRouters.post("/login", userController.login);
userRouters.post("/refresh-token", userController.refreshToken);
userRouters.post("/me", userController.me);

export { userRouters };
