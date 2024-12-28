const UserModel = require("../models/user.model");
const { verifyAccessToken, getFileData } = require("../utils/helper");

const logMiddleware = (req, res, next) => {
  console.log(req.url, new Date());
  next();
};
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Token not found!" });
    }
    const payload = verifyAccessToken(token);
    const foundUser = await UserModel.findById(payload.id);
    if (!foundUser) {
      return res.status(401).json({ message: "Token not valid" });
    }
    const data = foundUser.toJSON();
    delete data.password;
    req.user = data;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token not valid" });
  }
};

module.exports = { logMiddleware, authMiddleware };
