import asyncHandler from "express-async-handler";
import Banners from "../models/bannerModel.js";

const getBanners = asyncHandler(async (req, res) => {
  const banners = await Banners.find({});
  console.log(banners);
  res.json(banners);
});

export { getBanners };
