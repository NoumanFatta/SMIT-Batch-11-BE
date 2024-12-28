const express = require("express");
const authRoutes = require("./authRoutes");
const todoRoutes = require("./todoRoutes");
const { authMiddleware } = require("../middlewares");
const router = express.Router();

const allRoutes = router;

router.use("/auth", authRoutes);
router.use("/todos", authMiddleware, todoRoutes);

module.exports = allRoutes;
