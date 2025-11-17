import express from "express";
import userController from "../controllers/user.controller";
import authentication from "../middlewares/authentication";
const userRouters = express.Router();

userRouters.post("/register", userController.register);
userRouters.post("/login", userController.login);
userRouters.post("/refresh-token", userController.refreshToken);
userRouters.get("/me", authentication, userController.me);

export { userRouters };
