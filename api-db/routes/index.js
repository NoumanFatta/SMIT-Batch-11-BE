const express = require("express");
const authRoutes = require("./authRoutes");
const router = express.Router();

const allRoutes = router;

router.use("/auth", authRoutes);

module.exports = allRoutes;
