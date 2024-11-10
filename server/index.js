const express = require('express');
const mongoose = require('mongoose');
const postsRouter = require('./routes/postRoutes');
const commentRouter = require("./routes/commentRoute");
const replyRouter = require("./routes/replyRoute");
const userRouter = require("./routes/userRoute");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
const dotenv = require('dotenv');
dotenv.config();

app.use(cors())

// MongoDB Atlas connection string
const uri = 'mongodb+srv://vercel-admin-user:Mepassword123@cluster0.xvmqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // Replace with your Atlas URI

// Middleware
app.use(express.json());  // Middleware for parsing JSON requests

app.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "name email");
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Routes
app.use('/api/post', postsRouter);
app.use('/api/comment', commentRouter);
app.use('/api/reply', replyRouter);
app.use('/api/user', userRouter);  // Mount the posts router under "/api"

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((error) => console.error("Failed to connect to MongoDB Atlas:", error));

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


