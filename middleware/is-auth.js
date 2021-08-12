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

export { protect };

// module.exports = (req, res, next) => {
//   console.log("inside of MiddleWare");
//   const token = req.get("Authorization").split(" ")[1];
//   let decodedUserInfo;
//   try {
//     decodedUserInfo = jwt.verify(token, "somesupersecretsecret");
//     console.log(decodedUserInfo);
//     console.log(decodedUserInfo.exp);
//     let iat = decodedUserInfo.iat * 1000;
//     let exp = decodedUserInfo.exp * 1000;
//     // let current  =new Date();
//     // console.log(current.toLocaleString())
//     console.log(new Date(iat));
//     console.log(new Date(exp));
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
//   if (!decodedUserInfo) {
//     const error = new Error("Not authenticated");
//     error.statusCode = 401;
//     throw error;
//   }
//   req.userId = decodedUserInfo.userId;
//   next();
// };
