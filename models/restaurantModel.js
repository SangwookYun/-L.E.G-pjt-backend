import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       properties:
 *         _id:
 *           type: string
 *       email:
 *         type: string
 *       firstName:
 *         type: string
 *       lastName:
 *         type: string
 *
 *
 */
const restaurantSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "dbusers",
  },
  name: {
    type: String,
    required: true,
  },
  newid: {
    type: String,
    required: true,
  },
  isBusiness: {
    type: Boolean,
    required: true,
  },
  mainTitle: {
    type: String,
    required: true,
  },
  cuisine: {
    type: Array,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    max: 255,
  },
  phone: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  mainPicture: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  coupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "DBCoupon",
    },
  ],
});

restaurantSchema.plugin(uniqueValidator);
const Restaurant = mongoose.model("DBrestaurant", restaurantSchema);

export default Restaurant;
