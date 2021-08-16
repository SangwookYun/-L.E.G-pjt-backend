import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const bannerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

bannerSchema.plugin(uniqueValidator);
const Banner = mongoose.model("dbBanner", bannerSchema);

export default Banner;
