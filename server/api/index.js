// api/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const postsRouter = require("../routes/postRoutes");
const commentRouter = require("../routes/commentRoute");
const replyRouter = require("../routes/replyRoute");
const userRouter = require("../routes/userRoute");
const loginRouter = require("../routes/loginRoute");
const path = require("path");
const serverless = require("serverless-http");
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/post", postsRouter);
app.use("/api/comment", commentRouter);
app.use("/api/reply", replyRouter);
app.use("/api/user", userRouter);
app.use("/api/login", loginRouter);
app.use('/uploads', express.static('uploads'));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Wrap Express app with serverless-http
module.exports.handler = serverless(app);
