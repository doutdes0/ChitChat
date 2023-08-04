const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ msg: 'verifyJWT: No authorization header' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ msg: 'verifyJWT: Token invalid or expired' });
    }
    req.user = decoded.username;
    next();
  });
};

module.exports = verifyJWT;
