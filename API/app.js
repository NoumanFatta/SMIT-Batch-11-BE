const express = require("express");
const fs = require("fs");
const app = express();
const Joi = require("joi");

const PORT = 5000;
app.use(express.json());
// app.get("/", (req, res) => {
//   res.json({ route: "/" });
// });
// app.get("/abc", (req, res) => {
//   res.json({ route: "/abc" });
// });
// app.post("/abc", (req, res) => {
//   res.json({ message: "Your desires have been fulfilled" });
// });

app.post("/", (req, res) => {
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
      console.log(parsedData);
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

app.get("/", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
