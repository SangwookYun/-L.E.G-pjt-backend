import asyncHandler from 'express-async-handler';
import genToken from '../utils/genToken.js';
import User from '../models/userModel.js';
import Coupon from './../models/couponModel.js';
import CryptoJS from 'crypto-js';

const scanQrCode = asyncHandler(async (req, res) => {
  const bytes = CryptoJS.AES.decrypt(req.body, process.env.COUPON_SECRET);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  const user = await User.findById(decryptedData.userId);
  const coupon = await Coupon.findById(decryptedData.couponId);
  const matchedCoupons = user.coupons.filter(
    (c) => c._id.toString() == c._id.toString()
  );

  if (user && coupon && matchedCoupons.length < 1) {
    user.coupons.push(coupon);
  } else {
    res.status(404);
    throw new Error('Please check coupon information.');
  }

  const updatedCustomer = await user.save();

  res.json({
    _id: updatedCustomer._id,
    redeemedCoupons: updatedCustomer.coupons,
  });
});

const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({ _id: [...req.body.coupons] });
  if (coupons) {
    res.json(coupons);
  } else {
    res.status(404);
    throw new Error('Coupons not found');
  }
});

const getCouponById = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  if (coupon) {
    res.json({ _id: coupon.id, qrcode: coupon.qrcode });
  } else {
    res.status(404);
    throw new Error('Coupon not found');
  }
});

export { scanQrCode, getCoupons, getCouponById };
