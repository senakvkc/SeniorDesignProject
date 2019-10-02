const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (userId, email, secretKey, expiration) => {
    return jwt.sign(
      {
        userId,
        email
      },
      secretKey,
      {
        expiresIn: expiration
      }
    );
  }
};
