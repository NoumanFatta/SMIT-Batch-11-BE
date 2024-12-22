const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const UserModel = require("./models/user.model");
const allRoutes = require("./routes");
const app = express();
const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log("Mongoose Successfully Connected!");
  } catch (e) {
    console.error(e);
  }
};
app.use(express.json());
app.use("/api", allRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
  connectDB();
});
