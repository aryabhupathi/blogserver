const express = require("express");
// const Comment = require("../models/Comment");
const Comment = require('../../models/Comment')
const router = express.Router();
router.get("/comments", async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate("author", "name email")
      .populate("post", "title");
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/comments", async (req, res) => {
  const { content, post, author, replyToComment } = req.body;
  const comment = new Comment({
    content,
    post,
    author,
    replyToComment: replyToComment || null,
  });
  try {
    const newComment = await comment.save();
    if (replyToComment) {
      await Comment.findByIdAndUpdate(replyToComment, {
        $push: { replies: newComment._id },
      });
    }
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/comments/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    if (comment.replyToComment) {
      await Comment.findByIdAndUpdate(comment.replyToComment, {
        $pull: { replies: comment._id },
      });
    }
    await comment.remove();
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "name email")
      .populate("replies");
    if (!comments.length) {
      return res
        .status(404)
        .json({ message: "No comments found for this post" });
    }
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
