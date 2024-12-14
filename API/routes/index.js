const express = require("express");
const router = express.Router();
const userRoutes = require("./userRoutes");
const postRoutes = require("./postRoutes");
const authRoutes = require("./authRoutes");
const todosRoutes = require("./todosRoutes");
const { authMiddleware } = require("../middlewares");

router.use("/user", userRoutes);
router.use("/post", postRoutes);
router.use("/auth", authRoutes);
router.use("/todos", authMiddleware, todosRoutes);

module.exports = router;
