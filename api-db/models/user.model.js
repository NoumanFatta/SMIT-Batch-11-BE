const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "please insert email"],
    default: "test@test.com",
    unique: true,
  },
  password: {
    type: Number,
    min: 20,
  },
  role: {
    type: String,
    required: true,
    enum: {
      values: ["admin", "user"],
      message: "{VALUE} is not supported",
    },
  },
  test: {
    type: String,
    required: true,
    trim: true,
  },
});
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
