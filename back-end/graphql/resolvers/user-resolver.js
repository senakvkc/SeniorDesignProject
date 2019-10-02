const bcrypt = require('bcryptjs');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const moment = require('moment');
const fs = require('fs');
const _ = require('lodash');

const StringUtil = require('../../util/StringUtil');

const User = require('../../models/User');
const { fetchUserData } = require('./common');
const { createToken } = require('../../util/TokenUtil');

module.exports = {
  //
  // queries
  //
  getUsers: async (args, req) => {
    if (!req.isAuth) {
      throw new Error({
        text: 'Yetkisiz erişim.',
        code: 1
      });
    }

    try {
      const users = await User.find();
      return users.map(user => {
        return fetchUserData(user);
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getUserByUsername: async (args, req) => {
    if (!req.isAuth) {
      throw new Error({
        text: 'Yetkisiz erişim.',
        code: 1
      });
    }

    const { username } = args;

    try {
      const user = await User.findOne(username);
      return fetchUserData(user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  login: async args => {
    const { userLoginInput } = args;
    const { email, password, expiration } = userLoginInput;

    console.log(userLoginInput);

    if (_.isEmpty(_.trim(password)) || _.isEmpty(_.trim(email))) {
      return;
    }

    const user = await User.findOne({ email });

    // check if user exists.
    if (!user) {
      throw new Error({
        text: 'Geçersiz kullanıcı hesap bilgileri.',
        code: 1
      });
    }

    // check if user's password is equal with given password
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error({
        text: 'Geçersiz kullanıcı hesap bilgileri.',
        code: 1
      });
    }

    // create token.
    const token = createToken(user.id, user.email, 'SECRET_KEY', expiration);
    console.log(user);
    return {
      userId: user.id,
      token,
      expiration,
      user
    };
  },

  //
  // mutations
  //
  register: async args => {
    const { userRegisterInput } = args;
    const { username, email, password } = userRegisterInput;

    try {
      const user = await User.findOne({ $or: [{ username }, { email }] });
      if (user) {
        throw new Error({
          text: 'Böyle bir kullanıcı zaten var.',
          code: 1
        });
      }

      const hashedPass = await bcrypt.hash(password, 12);

      const newUser = new User({
        username,
        email,
        password: hashedPass
      });

      const res = await newUser.save();

      const token = createToken(res.id, email, 'SECRET_KEY', 1);

      return { ...res._doc, password: null, token };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  forgotPassword: async args => {
    const { emailOrUsername } = args;
    try {
      const user = await User.findOne({
        $or: [{ username: emailOrUsername }, { email: emailOrUsername }]
      });
      // if user does not exist, then wrong token is given.
      if (!user) {
        throw new Error({
          text: 'Böyle bir kullanıcı bulunmuyor.',
          code: 1
        });
      }

      // create token to use it to reset password
      const token = createToken(
        user.id,
        user.email,
        'FORGOT_PASSWORD_SECRET',
        24
      );

      // create email provider.
      let emailProvider = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'rawsly@gmail.com', // generated ethereal user
          pass: 'Lenovo235813.' // generated ethereal password
        }
      });

      // prepare and send the email
      let mail = await emailProvider.sendMail({
        from: '"rawsly.com" <reset@rawsly.com>', // sender address
        to: `${user.email}, rawsly@gmail.com`, // list of receivers
        subject: 'rawsly.com için şifre sıfırlama isteği', // Subject line
        text:
          'rawsly.com sitesindeki üyeliğiniz için şifre sıfırlama isteğinde bulundunuz.', // plain text body
        html: `<b>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın.</b><br /><br /><a href="http://localhost:3000/reset-password/${token}"><b>Şifremi Sıfırla</b></a>` // html body
      });

      // put new token info to user
      await User.updateOne(
        { _id: user.id },
        {
          resetPasswordToken: token,
          resetPasswordExpiration: moment().add(24, 'hours')
        }
      );

      return { emailOrUsername, token };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  resetPassword: async args => {
    const { newPassword, token } = args;
    console.log(token);
    try {
      const user = await User.findOne({
        resetPasswordToken: token
      });
      if (!user) {
        throw new Error(
          JSON.stringify({
            text: 'Geçersiz şifre sıfırlama isteği.',
            code: 1
          })
        );
      }

      if (moment().isAfter(user.resetPasswordExpiration)) {
        throw new Error(
          JSON.stringify({
            text: 'Süresi dolmuş şifre sıfırlama isteği.',
            code: 2
          })
        );
      }

      const hashedPass = await bcrypt.hash(newPassword, 12);

      await User.updateOne(
        { _id: user.id },
        {
          password: hashedPass,
          resetPasswordToken: null,
          resetPasswordExpiration: null
        }
      );

      return { ...user._doc, password: null };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  changeProfilePhoto: async (args, req) => {
    const { userId } = args;
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error(
          JSON.stringify({
            text: 'Böyle bir kullanıcı bulunmuyor.',
            code: 1
          })
        );
      }

      console.log(req.files);

      return user;

      /*
      await User.update(
        { _id: user.id },
        {
          profilePicture: {
            data: fs.readFileSync(req.file.profilePhoto.path),
            contentType: 'image/png'
          }
        }
        );
     */

      return user;

      return { ...user._doc, password: null };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
