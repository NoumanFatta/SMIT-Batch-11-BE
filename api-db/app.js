const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { MongoClient } = require("mongodb");
const app = express();
const connectDB = async () => {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("MongoDB succesfully connected");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
};
app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
  connectDB();
});
