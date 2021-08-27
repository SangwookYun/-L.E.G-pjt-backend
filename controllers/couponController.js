import asyncHandler from "express-async-handler";
import genToken from "../utils/genToken.js";
import User from "../models/userModel.js";
import Coupon from "./../models/couponModel.js";
import CryptoJS from "crypto-js";

const scanQrCode = asyncHandler(async (req, res) => {
  let data = {
    userId: "60d76260816ee225c09cc977",
    couponId: "60d7a7e3326c816e20d1ec4b",
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

  if (user && coupon && !user.coupons.includes(coupon._id)) {
    user.coupons.push(coupon);
  } else {
    res.status(404);
    throw new Error("Please check coupon information.");
  }

  const updatedCustomer = await user.save();

  res.json({
    _id: updatedCustomer._id,
    redeemedCoupons: updatedCustomer.coupons,
    token: genToken(updatedCustomer._id),
  });
});

export { scanQrCode };
