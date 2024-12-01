const express = require("express");
const router = express.Router();
const fs = require("fs");
const Joi = require("joi");

router.post("/", (req, res) => {
  try {
    const schema = Joi.object({
      username: Joi.string().min(3).max(30).required(),
    });
    const validation = schema.validate(req.body);
    if (validation.error) {
      return res.status(400).json({ message: validation.error.message });
    }
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Please provide data" });
    }
    let data = [];
    if (fs.existsSync("./files/test.json")) {
      const fileData = fs.readFileSync("./files/test.json");
      const parsedData = JSON.parse(fileData);
      data = parsedData.data ?? [];
    }
    const obj = {
      data: [...data, req.body],
    };
    fs.writeFileSync("./files/test.json", JSON.stringify(obj));
    res.json(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/", (req, res) => {
  try {
    let data = [];
    if (fs.existsSync("./files/test.json")) {
      const fileData = fs.readFileSync("./files/test.json");
      const parsedData = JSON.parse(fileData);
      data = parsedData;
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
