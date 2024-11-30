const express = require("express");
const fs = require("fs");
const app = express();

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
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Please provide data" });
    }
    if (fs.existsSync("./files/test.json")) {
      const data = fs.readFileSync("./files/test.json");
      console.log(JSON.parse(data))
    }
    const f = fs.writeFileSync("./files/test.json", JSON.stringify(req.body));
    console.log(req.body);
    res.json(req.body);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
