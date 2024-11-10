const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
    },
    date: {
      type: String,
      default: new Date().toISOString().split("T")[0],
    },
    time: {
      type: String,
      default: new Date().toLocaleTimeString(),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Post", postSchema, "post");
