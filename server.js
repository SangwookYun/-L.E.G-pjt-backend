import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import restaurantRoutes from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import bannerRoutes from "./routes/bannerRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import connDB from "./config/db.js";

dotenv.config();

connDB();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options("*", cors());
app.use(cors());
app.use(express.json());

const version = "/api/v1";
app.use(version + "/users", userRoutes);
app.use(version + "/banner", bannerRoutes);
app.use(version + "/category", categoryRoutes);
app.use(version + "/restaurant", restaurantRoutes);
app.use(version + "/coupon", couponRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

const PORT = process.env.PORT || 8080; // Need this for Heroku

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
