const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userId: String,
    token: String,
    email: String,
    name: String,
    profileImage: String,
    dateOfBirth: Date,
    gender: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", UserSchema);
