const express = require("express");
const UserModel = require("../models/user.model");
const { generateAccessToken } = require("../utils/helper");
const router = express.Router();
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const userData = new UserModel(body);
    console.log(body);
    await userData.save();
    res.status(201).json({ message: "user has beeen registered" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const body = req.body;
    const foundUser = await UserModel.findOne({ email: body.email });
    if (!foundUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      body.password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ message: "email and passwword are invalid" });
    }
    const token = generateAccessToken(foundUser._id);

    res
      .status(201)
      .json({ message: "user has beeen logged in ", data: { token } });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

const authRoutes = router;
module.exports = authRoutes;
