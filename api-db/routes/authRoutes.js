const express = require("express");
const UserModel = require("../models/user.model");
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const body = req.body;
    const userData = new UserModel(body);
    await userData.save();
    res.status(201).json({ message: "user has beeen registered" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

const authRoutes = router;
module.exports = authRoutes;
