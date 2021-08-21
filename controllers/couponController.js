import asyncHandler from "express-async-handler";
import genToken from "../utils/genToken.js";
import User from "../models/userModel.js";
import Coupon from "./../models/couponModel.js";
import CryptoJS from "crypto-js";

const scanQrCode = asyncHandler(async (req, res) => {
  let data = {
    userId: "60d76260816ee225c09cc977",
    couponId: "6120d651ccc1244bc41fbdac",
  };
  let ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    "secret key 123"
  ).toString();

  const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  //TODO:HENDRIK:Remove the above code after checking the datatype and type passed in from the FE.

  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const user = await User.findById(decryptedData.userId);
  const coupon = await Coupon.findById(decryptedData.couponId);

  if (
    user &&
    coupon &&
    coupon.isUsed === false &&
    user.coupons.includes(coupon._id)
  ) {
    let updatedUserCoupons = user.coupons.filter(function (e) {
      return e._id.toString() !== coupon._id.toString();
    });
    user.coupons = updatedUserCoupons;
  } else {
    res.status(404);
    throw new Error("Please check coupon information.");
  }

  const updatedUser = await user.save();
  const updatedCoupon = await Coupon.findOneAndUpdate(
    { _id: coupon._id },
    { $set: { isUsed: true } },
    { useFindAndModify: false },
    (err) => {
      if (err) {
        err.reason = "Failed to update coupon status.";
        res.status(404).send(err);
      }
    }
  );

  res.json({
    _id: updatedUser._id,
    userCoupons: updatedUser.coupons,
    redeemedCoupon: { id: updatedCoupon._id, isUsed: updatedCoupon.isUsed },
    token: genToken(updatedUser._id),
  });
});

export { scanQrCode };
