import asyncHandler from "express-async-handler";
import Restaurant from "../models/restaurantModel.js";

const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

const getRestaurantById = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.id);

  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404);
    throw new Error("Restaurant not found");
  }
});
// const registerUser = asyncHandler(async (req, res) => {
//   const { name, email, password } = req.body;

//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     res.status(400);
//     throw new Error("User already exists");
//   }

//   const user = await User.create({
//     name,
//     email,
//     password,
//   });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: genToken(user._id),
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid user data");
//   }
// });

// const getProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   if (user) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       status: user.status,
//       coupons: user.coupons,
//       couponlimit: user.couponlimit,
//     });
//   } else {
//     res.status(404);
//     throw new Error("Invalid credentials");
//   }
// });

// const updateCoupon = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id);
//   const { coupon } = req.body;

//   if (user) {
//     user.coupons.push(coupon);
//   } else {
//     res.status(404);
//     throw new Error("Could not find this user.");
//   }

//   const updatedUser = await user.save();

//   res.json({
//     _id: updatedUser._id,
//     name: updatedUser.name,
//     email: updatedUser.email,
//     coupons: updatedUser.coupons,
//     token: genToken(updatedUser._id),
//   });
// });

export { getRestaurants, getRestaurantById };
