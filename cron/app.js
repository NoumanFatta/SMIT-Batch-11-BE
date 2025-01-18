const express = require("express");
const app = express();
const cron = require("node-cron");

cron.schedule("*/10 * * * * *", function () {
  console.log("running every 10 second");
});
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(3000, () => {
  console.log("Server running at PORT");
});
