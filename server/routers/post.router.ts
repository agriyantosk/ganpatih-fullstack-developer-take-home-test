import express from "express";
import postController from "../controllers/post.controller";
const postRouters = express.Router();

postRouters.get("/feed", postController.getFeed);
postRouters.post("/posts", postController.createPost);

export { postRouters };
