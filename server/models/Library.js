const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LibrarySchema = new Schema(
  {
    user:{
      type: String
    },
    stories:{
      type:Array,
      default:[]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Library", LibrarySchema);
