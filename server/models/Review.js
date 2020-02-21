const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema(
  {
    rating: Number,
    comment: String,
    userId: String,
    storyId: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Review", ReviewSchema);
