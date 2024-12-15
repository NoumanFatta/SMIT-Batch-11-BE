const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
const getFileData = (fileName) => {
  const filePath = path.join(process.cwd(), `/files/${fileName}`);
  let data = {
    data: [],
  };
  if (fs.existsSync(filePath)) {
    const fileData = fs.readFileSync(filePath);
    const parsedData = JSON.parse(fileData);
    data = parsedData;
  }
  return data;
};
const addFileData = (fileName, newData) => {
  const filePath = path.join(process.cwd(), `/files/${fileName}`);
  const obj = {
    data: newData,
  };
  fs.writeFileSync(filePath, JSON.stringify(obj));
};
const appendFileData = (fileName, newData) => {
  const data = getFileData(fileName);
  data.data.push(newData);
  addFileData(fileName, data.data);
};
module.exports = {
  generateAccessToken,
  getFileData,
  addFileData,
  verifyAccessToken,
  appendFileData
};
