import express from "express";
const router = express.Router();
import {
  getRestaurants,
  getRestaurantById,
} from "../controllers/restaurantController.js";
// import { protect } from "../middleware/is-auth.js";

router.route("/").get(getRestaurants);
router.route("/:id").get(getRestaurantById);

export default router;
