const mongoose = require("mongoose");
const replySchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
      minlength: [1, "Reply content cannot be empty"],
    },
    comment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Reply", replySchema, "reply");
