import express from "express";
import {
  getMyFriends,
  getRecommendedUsers,
  sendFriendRequest,
  acceptFriendRequest,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express();

router.use(protectedRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.post("/friend-request/:id/", acceptFriendRequest);

export default router;
