const express = require("express");
const authRoutes = require("./authRoutes");
const todoRoutes = require("./todoRoutes");
const { authMiddleware } = require("../middlewares");
const userRoutes = require("./userRoutes");
const formRoutes = require("./formRoutes");
const router = express.Router();

const allRoutes = router;

router.use("/auth", authRoutes);
router.use("/todos", authMiddleware, todoRoutes);
router.use("/user", authMiddleware, userRoutes);
router.use("/form", authMiddleware, formRoutes);

module.exports = allRoutes;
