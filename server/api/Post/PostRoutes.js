const express = require("express");
// const Post = require("../models/Post");
const Post = require("../../models/Post");
const router = express.Router();
// const User = require("../models/User");
const User = require("../../models/User");
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "author",
      "name email"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/posts", async (req, res) => {
  const { title, content, tags, authorId } = req.body;
  if (!title || !content || !authorId) {
    return res
      .status(400)
      .json({ message: "Title, content, and authorId are required" });
  }
  try {
    const author = await User.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: "User not found" });
    }
    const post = new Post({
      title,
      content,
      tags,
      author: authorId,
    });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.put("/posts/:id", async (req, res) => {
  const { title, content, tags, image } = req.body;
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, tags, image },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/posts/user/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId }).populate(
      "author",
      "name email"
    );
    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user" });
    }
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
