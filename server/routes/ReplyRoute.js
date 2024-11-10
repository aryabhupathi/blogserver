const express = require("express");
const Reply = require("../models/Reply");
const router = express.Router();
router.get("/replies", async (req, res) => {
  try {
    const replies = await Reply.find()
      .populate("author", "name email")
      .populate("comment", "content");
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/replies", async (req, res) => {
  const { content, comment, author } = req.body;
  const reply = new Reply({
    content,
    comment,
    author,
  });
  try {
    const newReply = await reply.save();
    res.status(201).json(newReply);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/replies/:id", async (req, res) => {
  try {
    const reply = await Reply.findById(req.params.id);
    if (!reply) {
      return res.status(404).json({ message: "Reply not found" });
    }
    await reply.remove();
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/comments/:commentId/replies", async (req, res) => {
  try {
    const replies = await Reply.find({
      comment: req.params.commentId,
    }).populate("author", "name email");
    if (!replies.length) {
      return res
        .status(404)
        .json({ message: "No replies found for this comment" });
    }
    res.status(200).json(replies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
