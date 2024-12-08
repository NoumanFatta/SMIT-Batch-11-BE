const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const getFileData = (fileName) => {
  const filePath = path.join(process.cwd(), `/files/${fileName}`);
  let data = [];
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    const parsedData = JSON.parse(fileData);
    data = parsedData;
  }
  return data
};
module.exports = { generateAccessToken, getFileData };
