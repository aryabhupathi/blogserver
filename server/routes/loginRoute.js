const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Post = require("../models/Post");
const router = express.Router();
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.name, role: user.role },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );
    const posts = await Post.find({ author: user._id }).populate(
      "author",
      "name email"
    );
    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
      posts: posts,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Error logging in" });
  }
});
module.exports = router;
