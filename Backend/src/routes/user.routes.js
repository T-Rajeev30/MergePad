import express from "express";
import {
  getMyFriends,
  getRecommendedUsers,
  sendFriendRequest,
  acceptFriendRequest,
  getFriendRequests,
  getOutgoingFriendRequests,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express();

router.use(protectedRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendRequests);

export default router;
