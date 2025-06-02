import e from "express";
const router = e.Router();
import {
  login,
  logout,
  onboarding,
  signup,
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/onboarding", protectedRoute, onboarding);

router.get("/me", protectedRoute, (req, res) => {
  res.status(200).json({ success: true, user: req.user });
});

export default router;

// Password == VBb0iaA2NIeHlWfs
// Username ==  rajeevtiwari30305
//mongodb+srv://rajeevtiwari30305:VBb0iaA2NIeHlWfs@cluster0.xwqqko2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster
