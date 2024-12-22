const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");
const app = express();
const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log("Mongoose Successfully Connected!");
  } catch (e) {
    console.error(e);
  }
};

app.get("/", async (req, res) => {
  try {
    const userData = new UserModel({
      email: "ab",
      password: 20,
      test: "    test     ",
      role: "admin",
    });
    console.log(userData._id)
    await userData.save();
    res.send("hello");
  } catch (error) {
    res.send("soething went wrong");
    console.log("error", error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
  connectDB();
});
