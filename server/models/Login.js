const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  token: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("Login", loginSchema, "user");
