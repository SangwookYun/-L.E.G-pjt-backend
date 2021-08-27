import express from "express";
const router = express.Router();
import { scanQrCode } from "../controllers/couponController.js";
import { protect, owner } from "../middleware/is-auth.js";

router.route("/scan").post(scanQrCode);
// router.route("/scan").post(protect, owner, scanQrCode);

export default router;
