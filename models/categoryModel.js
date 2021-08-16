import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    restaurants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "dbrestaurants",
      },
    ],
  },
  { collection: "dbCategory" },
  {
    timestamps: true,
  }
);

categorySchema.plugin(uniqueValidator);
const Category = mongoose.model("dbCategory", categorySchema);

export default Category;
