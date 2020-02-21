const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    name: String,
    age: Number,
    fbId: String,
    profileImage: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Author", AuthorSchema);
