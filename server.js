const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 8080; // Need this for Heroku
const dotenv = require("dotenv");

const restaurant = require("./routes/restaurant");
const auth = require("./routes/auth");
const advertisement = require("./routes/advertisement");
const category = require("./routes/category");
const coupon = require("./routes/coupon");
const connDB = require("./config/db");

dotenv.config();

connDB();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options("*", cors());
app.use(cors());
app.use(express.json());

const version = "/api/v1";
app.use(version + "/auth", auth);
app.use(version + "/restaurant", restaurant);
app.use(version + "/advertisement", advertisement);
app.use(version + "/category", category);
app.use(version + "/coupon", coupon);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
