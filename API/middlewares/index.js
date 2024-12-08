const jwt = require('jsonwebtoken');

const logMiddleware = (req, res, next) => {
  console.log(req.url, new Date());
  next();
};
const authMiddleware = () => {
}

module.exports = { logMiddleware };
