const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const postsRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoute");
const replyRouter = require("./routes/replyRoute");
const userRouter = require("./routes/userRoute");
const loginRouter = require("./routes/loginRoute");
const path = require("path");
// const dotenv = require('dotenv');
// dotenv.config();
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


// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.log(err));


  mongoose.connect('mongodb+srv://vercel-admin-user:Mepassword123@cluster0.xvmqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
