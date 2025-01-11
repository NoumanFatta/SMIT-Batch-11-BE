const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const allRoutes = require("./routes");
const path = require("path");
const app = express();

// mongo db connection
const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  try {
    await mongoose.connect(uri);
    console.log("Mongoose Successfully Connected!");
  } catch (e) {
    console.error(e);
  }
};

// middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); // static files ke liye

// send html files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/signup.html"));
});
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/login.html"));
});
app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/form.html"));
});
app.get("/response", (req, res) => {
  res.sendFile(path.join(__dirname, "public/html/response.html"));
});


// routes
app.use("/api", allRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
  connectDB();
});
