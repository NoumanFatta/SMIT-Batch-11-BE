const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const UserModel = require("./models/userModel");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index", {
    myName: {
      name: "Nouman Fatta",
      fruits: ["Apple", "Banana", "Mango"],
    },
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/profile/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await UserModel.findById(id);
    if (!data) {
      return res.redirect("/404");
    }
    res.render("profile", { ...data.toJSON() });
  } catch (error) {
    console.log(error);
    res.redirect("/wrong");
  }
});
app.get("/profile", async (req, res) => {
  try {
    const profiles = await UserModel.find();
    res.render("profiles", { profiles });
  } catch (error) {
    console.log(error);
    res.redirect("/wrong");
  }
});
app.get("/wrong", (req, res) => {
  res.render("error");
});
app.get("/404", (req, res) => {
  res.render("notfound");
});

app.post("/profile", async (req, res) => {
  try {
    console.log(">>>>>");
    const body = req.body;
    const data = new UserModel({ ...body });
    await data.save();
    res.redirect(`/profile/${data._id.toString()}`);
  } catch (error) {
    console.log(error);
    res.redirect("/wrong");
  }
});

app.post("/profile/:id", async (req, res) => {
  try {
    console.log(req.params.id)
    const test = await UserModel.deleteOne({ _id: req.params.id });
    console.log(test)
    res.redirect("/profile");
  } catch (error) {
    console.log(error);
    res.redirect("/wrong");
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/mvc");
    console.log("Mongoose conntected!");
  } catch (error) {
    console.log(error);
  }
};
app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
  connectDB();
});
