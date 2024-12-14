const { verifyAccessToken } = require("../utils/helper");

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
    const jwt = verifyAccessToken(token);
    req.userId = jwt.id
    next();
  } catch (error) {
    res.status(401).json({ message: "Token not valid" });
  }
};

module.exports = { logMiddleware, authMiddleware };
