const express = require("express");
const TodoModel = require("../models/todo.model");
const UserModel = require("../models/user.model");
const router = express.Router();
const userRoutes = router;

router.patch("/", async (req, res) => {
  try {
    const body = req.body;
    const user = req.user;
    user.email = body.email ?? user.email;
    if (body.password) {
      user.password = body.password;
    }
    await user.save();
    res.json({ message: "User upadted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = userRoutes;
