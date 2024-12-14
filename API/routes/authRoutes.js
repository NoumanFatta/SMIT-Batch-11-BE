const express = require("express");
const router = express.Router();
const fs = require("fs");
const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const {
  generateAccessToken,
  getFileData,
  addFileData,
} = require("../utils/helper");
const { ENUMS } = require("../utils/vars");

router.post("/login", (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.message });
  }
  const userData = getFileData(ENUMS.userFile);
  const { email, password } = req.body;
  const foundUser = userData.data.find((u) => u.email === email);
  if (!foundUser) {
    return res.status(401).json({ message: "invalid credential" });
  }
  if (password !== foundUser.password) {
    return res.status(401).json({ message: "invalid credential" });
  }
  const token = generateAccessToken(foundUser.id);
  res.json({ message: "Logged in success", token });
});
router.post("/register", (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });
  const validation = schema.validate(req.body);
  if (validation.error) {
    return res.status(400).json({ message: validation.error.message });
  }
  const userData = getFileData(ENUMS.userFile);
  const { email, password } = req.body;
  const foundUser = userData.data.find((u) => u.email === email);
  if (foundUser) {
    return res.status(409).json({ message: "Email already exists" });
  }
  userData.data.push({ id: uuidv4(), email, password });
  addFileData(ENUMS.userFile, userData.data);
  res.json({ message: "User successfully registered" });
});

const authRoutes = router;
module.exports = authRoutes;
