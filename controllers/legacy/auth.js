const User = require("../../models/userModel");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const user = require("../../models/userModel");

exports.signup = (req, res, next) => {
  console.log("inside signup");
  console.log(req.body);
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const user = new User({
        email: email,
        password: hashedPw,
        name: name,
      });
      return user.save();
    })
    .then((result) => {
      const token = jwt.sign(
        {
          email: email,
          userId: result._id.toString(),
        },
        "somesupersecretsecret",
        {
          expiresIn: "1000",
        }
      );

      res.status(200).json({
        token: token,
        userId: result._id.toString(),
        email: email,
        name: name,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  console.log(email);
  console.log(password);
  User.findOne({
    email: email,
  })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found!");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "somesupersecretsecret",
        {
          expiresIn: "1000000",
        }
      );
      res.status(200).json({
        token: token,
        userId: loadedUser._id.toString(),
        email: loadedUser.email,
        name: loadedUser.name,
        user: loadedUser,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  const email = req.body.email;
  console.log(email);
  User.findOne({ email: email })
    .then((result) => {
      console.log("this is result");
      console.log(result);
      res.status(200).json({ message: "success get restaurant", data: result });
    })
    .catch((err) => {
      console.log("this is err");
      console.log(err);
      if (err) {
        res.status(500).json({ message: "unable to retrieve data" });
      }
    });
};

exports.updateCoupon = (req, res, next) => {
  const email = req.body.email;
  const coupon = req.body.coupon;
  console.log(coupon);
  user
    .findOne({ email: email })
    .then(async (result) => {
      console.log("Find?");
      console.log(result);
      if (!result) {
        const error = new Error("Could not find this user!");
        error.statusCode = 404;
        throw error;
      }
      let newCoupons = [...result.coupons];
      newCoupons.push(coupon);
      console.log(newCoupons);
      result.coupons = newCoupons;
      console.log("working!");
      return result.save();
    })
    .then((result2) => {
      console.log("working2!");
      console.log(result2);
      res.status(200).json({ message: "Coupons updated", user: result2 });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json({ message: "failed" });
    });
};
