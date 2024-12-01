const express = require("express");
const fs = require("fs");
const app = express();
const Joi = require("joi");
var cors = require("cors");
const userRoute = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const PORT = 5000;
app.use(express.json());
app.use(cors());
app.use("/", userRoute);
app.use("/post", postRoutes);
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
