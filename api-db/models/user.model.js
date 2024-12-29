const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  const saltRounds = 10;
  const hashedPassowrd = await bcrypt.hash(user.password, saltRounds);
  user.password = hashedPassowrd;
  next();
});
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
