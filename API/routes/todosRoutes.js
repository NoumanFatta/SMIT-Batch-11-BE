const express = require("express");
const router = express.Router();
const fs = require("fs");
const Joi = require("joi");
const { getFileData } = require("../utils/helper");
const { ENUMS } = require("../utils/vars");

router.get("/", (req, res) => {
  console.log(req.userId, ">>>>>>>>");
  const data = getFileData(ENUMS.todoFile);
  res.json(data);
});

const todosRoutes = router;
module.exports = todosRoutes;
