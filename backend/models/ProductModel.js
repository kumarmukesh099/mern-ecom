import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
  name: { type: String, required: true },
  rating: { type: String, required: true },
  comment: { type: String, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt : {type: Date}
});

const productModel = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    brand: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    reviews: [reviewSchema],
    numReviews: {
      type: Number,
      required: false,
      default: 0,
    },
    price: {
      type: Number,
      required: false,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("product", productModel);
