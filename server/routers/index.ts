import express from "express";
import { userRouters } from "./user.router";
import { postRouters } from "./post.router";
import { followRouters } from "./follow.router";
import authentication from "../middlewares/authentication";

const router = express.Router();

router.use(userRouters);
router.use(authentication);
router.use(postRouters);
router.use(followRouters);

export default router;
