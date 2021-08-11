import mongoose from "mongoose";
import bycrypt from "bcryptjs";
import uniqueValidator from "mongoose-unique-validator";

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
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
const userShema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "I am a new user!",
    },
    couponlimit: {
      type: Number,
      default: 3,
    },
    coupons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DBCoupon",
      },
    ],
    // TODO: Need maybe user's credit card info
  },
  {
    timestamps: true,
  }
);

userShema.methods.matchPassword = async function (enteredPassword) {
  return await bycrypt.compare(enteredPassword, this.password);
};
userShema.plugin(uniqueValidator);
const User = mongoose.model("DBUser", userShema);

export default User;
