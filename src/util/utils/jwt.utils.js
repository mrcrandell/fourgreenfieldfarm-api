const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const sign = (obj = {}) => {
  return jwt.sign(obj, JWT_SECRET, {
    expiresIn: '168h',
  });
};

const verify = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  sign,
  verify,
};
