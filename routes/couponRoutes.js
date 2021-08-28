import express from "express";
const router = express.Router();
import { scanQrCode, getCouponById } from "../controllers/couponController.js";
import { protect, owner } from "../middleware/is-auth.js";

router.route("/:id").get(getCouponById);
router.route("/scan").post(scanQrCode);
// router.route("/scan").post(protect, owner, scanQrCode);

export default router;
