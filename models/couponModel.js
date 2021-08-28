import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const couponSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "dbusers",
    },
    // HENDRIK:COMMENT:Need to discuss do we need this feild.
    // category: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "DBUser",
    // },
    name: {
      type: String,
      required: true,
    },
    restaurant: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    qrcode: {
      type: String,
      required: true,
    },
  },
  { collection: "dbCoupons" },
  { timestamps: true }
);

couponSchema.plugin(uniqueValidator);
const Coupon = mongoose.model("dbCoupons", couponSchema);

export default Coupon;
