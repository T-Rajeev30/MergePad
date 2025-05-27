import e from "express";
const router = e.Router();
import { login, logout, signup } from "../controllers/auth.controller.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;

// Password == VBb0iaA2NIeHlWfs
// Username ==  rajeevtiwari30305
//mongodb+srv://rajeevtiwari30305:VBb0iaA2NIeHlWfs@cluster0.xwqqko2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
