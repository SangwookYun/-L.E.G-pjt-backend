import asyncHandler from "express-async-handler";
import Category from "./../models/categoryModel.js";

const getCategories = asyncHandler(async (req, res) => {
  const categoryList = await Category.find({});

  if (categoryList) {
    res.json(categoryList);
  } else {
    res.status(404);
    throw new Error("Categories not found");
  }
});

export { getCategories };
