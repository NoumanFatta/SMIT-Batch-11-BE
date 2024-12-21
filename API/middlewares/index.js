const { verifyAccessToken, getFileData } = require("../utils/helper");
const { ENUMS } = require("../utils/vars");

const logMiddleware = (req, res, next) => {
  console.log(req.url, new Date());
  next();
};
const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Token not found!" });
    }
    const payload = verifyAccessToken(token);
    const allUsers = getFileData(ENUMS.userFile);
    const foundUser = allUsers.data.find((u) => u.id === payload.id && u.isActive);
    if (!foundUser) {
      return res.status(401).json({ message: "Token not valid" });
    }
    delete foundUser.password
    req.user = foundUser;
    next();
  } catch (error) {
    res.status(401).json({ message: "Token not valid" });
  }
};

module.exports = { logMiddleware, authMiddleware };
