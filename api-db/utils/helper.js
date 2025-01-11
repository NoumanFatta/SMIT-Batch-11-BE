const jwt = require("jsonwebtoken");


const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
module.exports = { generateAccessToken, verifyAccessToken };
