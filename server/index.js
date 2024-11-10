// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const postsRouter = require("./routes/postRoutes");
// const commentRouter = require("./routes/commentRoute");
// const replyRouter = require("./routes/replyRoute");
// const userRouter = require("./routes/userRoute");
// const loginRouter = require("./routes/loginRoute");
// // const path = require("path");
// // const dotenv = require('dotenv');
// // dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// // Ensure you have a route defined for '/'
// app.get("/", (req, res) => {
//   res.send("Hello World!"); // Or render a page
// });

// app.get("/api/post", postsRouter);
// app.get("/api/comment", commentRouter);
// app.get("/api/reply", replyRouter);
// app.get("/api/user", userRouter);
// app.get("/api/login", loginRouter);

//   mongoose.connect('mongodb+srv://vercel-admin-user:Mepassword123@cluster0.xvmqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
// // Start the server
// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const postsRouter = require("./routes/postRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/posts", postsRouter);

// Connect to MongoDB
mongoose.connect('mongodb+srv://vercel-admin-user:Mepassword123@cluster0.xvmqj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.log("MongoDB connection failed", err);
});

// Export handler for Vercel
module.exports = app;
