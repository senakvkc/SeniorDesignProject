const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (userId, email, secretKey) => {
    return jwt.sign(
      {
        userId,
        email
      },
      secretKey
    );
  },

  verifyToken: (resolve, token, secretKey) => {
    jwt.verify(token, secretKey, (err, result) => {
      if (err) {
        resolve({
          ok: false,
          result: err
        });
      } else {
        resolve({
          ok: true,
          result
        });
      }
    });
  }
};
