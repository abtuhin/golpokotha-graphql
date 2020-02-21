const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StorySchema = new Schema(
  {
    title: {
      type: String
    },
    views: {
      type: Number,
      default: 0
    },
    loved: {
      type: Number,
      default: 0
    },
    trending: {
      type: Boolean,
      trending: false
    },
    pdf: {
      type: String
    },
    category: {
      type: Array,
      default: []
    },
    imageUrl: {
      type: String
    },
    authorId: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Story", StorySchema);
