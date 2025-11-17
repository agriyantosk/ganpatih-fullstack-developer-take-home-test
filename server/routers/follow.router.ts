import express from "express";
import followController from "../controllers/follow.controller";
const followRouters = express.Router();

followRouters.post("/follow/:user_id", followController.follow);
followRouters.delete("/follow/:user_id", followController.unfollow);

export { followRouters };
