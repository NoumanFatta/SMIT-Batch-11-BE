const express = require("express");
const authRoutes = require("./authRoutes");
const todoRoutes = require("./todoRoutes");
const { authMiddleware } = require("../middlewares");
const userRoutes = require("./userRoutes");
const formRoutes = require("./formRoutes");
const responseRoutes = require("./response");
const router = express.Router();

const allRoutes = router;

// usman's api
router.use("/logout", (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// sir api's
router.use("/auth", authRoutes);
router.use("/form", authMiddleware, formRoutes);
router.use("/response", authMiddleware, responseRoutes);
// router.use("/user", authMiddleware, userRoutes);
// router.use("/todos", authMiddleware, todoRoutes);

module.exports = allRoutes;
