const jwt = require('jsonwebtoken');

module.exports = {
  createToken: (userId, email, phone, secretKey) => {
    return jwt.sign(
      {
        userId,
        email,
        phone
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
  },

  createCode: () => {
    let code = Math.floor(Math.random() * 9999) + 1000;
    while (code > 9999) {
      code = Math.floor(Math.random() * 9999) + 1000;
    }

    return code;
  }
};
