import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getProfile,
  updateCoupon,
} from "../controllers/userController.js";
import { protect } from "../middleware/is-auth.js";

router.post("/login", authUser);
router.route("/profile").get(protect, getProfile);
router.route("/register").post(registerUser);
router.route("/update_cp").put(protect, updateCoupon);

export default router;
