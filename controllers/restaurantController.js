import asyncHandler from "express-async-handler";
import Restaurant from "../models/restaurantModel.js";

const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find({ isBusiness: true });
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

export { getRestaurants, getRestaurantById };
