import express from "express";
import {
  getMyFriends,
  getRecommendedUsers,
} from "../controllers/user.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
const router = express();

router.use(protectedRoutez);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

export default router;
