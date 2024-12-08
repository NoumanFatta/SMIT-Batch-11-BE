const express = require("express");
const router = express.Router();
const fs = require("fs");
const Joi = require("joi");

router.get("/", (req, res) => {
  res.json({ message: "Hello" });
});
const postRoutes = router;
module.exports = postRoutes;
