import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
  let jwtToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      jwtToken = req.headers.authorization.split(" ")[1];
      const decodedUserInfo = jwt.verify(jwtToken, process.env.JWT_SECRET);
      console.log(decodedUserInfo);
      req.user = await User.findById(decodedUserInfo.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!jwtToken) {
    res.status(401);
    throw new Error("Not authorized");
  }
});

const owner = (req, res, next) => {
  if (req.user && req.user.userType === 1) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an owner");
  }
};

export { protect, owner };
