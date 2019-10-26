const bcrypt = require('bcryptjs');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const moment = require('moment');
const fs = require('fs');
const _ = require('lodash');
const i18n = require('i18n');
const shortId = require('shortid');
const uuidv1 = require('uuid/v1');
const xoauth2 = require('xoauth2');

const StringUtil = require('../../util/StringUtil');

const User = require('../../models/User');
const Post = require('../../models/Post');

const { fetchUserData } = require('./common');
const { createToken } = require('../../util/TokenUtil');

module.exports = {
  //
  // queries
  //

  /* ======================= */
  /* USER QUERIES            */
  /* ======================= */
  login: async args => {
    const { userLoginInput } = args;
    const { emailOrPhone, password, expiration } = userLoginInput;

    console.log(userLoginInput);

    // validate fields.
    if (_.isEmpty(_.trim(password)) || _.isEmpty(_.trim(emailOrPhone))) {
      throw new Error({
        text: i18n.__('noEmptyFields'),
        code: 1
      });
    }

    // find user
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
    });

    // check if user exists.
    if (!user) {
      throw new Error({
        text: i18n.__('invalidAccountInfo'),
        code: 1
      });
    }

    // check if user's password is qeual with given password
    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      throw new Error({
        text: i18n.__('invalidAccountInfo'),
        code: 1
      });
    }

    // create token.
    const token = createToken(
      user.id,
      user.email,
      process.env.SECRET_KEY,
      expiration
    );
    return {
      userId: user.id,
      token,
      expiration,
      user
    };
  },

  getUsers: async (args, req) => {
    // TODO: Yetki kontrolü

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

  getUserById: async (args, req) => {
    // TODO: Yetki kontrolü

    const { userId } = args;

    try {
      const user = await User.findById(userId);
      return fetchUserData(user);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getUserByUsername: async (args, req) => {
    // TODO: Yetki kontrolü

    const { username } = args;

    try {
      const user = await User.findOne({ username });
      return fetchUserData(user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getUserByPhone: async (args, req) => {
    // TODO: Yetki kontrolü
    
    const { phone } = args;
    try {
      const user = await User.findOne({ phone });
      return fetchUserData(user);
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getLast10Posts: async (args, req) => {
    // TODO: Yetki kontrolü

    try {
      // sorting newest to oldest
      const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
      return posts;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getPostById: async (args, req) => {
    // TODO: Yetki kontrolü

    const { postId } = args;

    try {
      const post = await Post.findById(postId);
      return post;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getPostsWithPage: async (args, req) => {
    // TODO: Yetki kontrolü

    const { offset, limit } = args;

    try {
      const posts = await Post.find().skip(offset).sort({ createdAt: -1 }).limit(limit);
      return posts;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getPostsByUser: async (args, req) => {
    // TODO: Yetki kontrolü

    const { userId } = args;

    try {
      const posts = await Post.find({ user: userId }).sort({ createdAt: - 1});
      return posts;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  getPostsByUserWithPage: async (args, req) => {
    // TODO: Yetki kontrolü

    const { userId, offset, limit } = args;

    try {
      const posts = await Post.find({ user: userId }).skip(offset).sort({ createdAt: -1 }).limit(limit);
      return posts;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  //
  // mutations
  //
  register: async args => {
    const { userRegisterInput } = args;
    const { email, phone, password } = userRegisterInput;

    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const phoneRegex = /5\d{9}/;

    // validate fields.
    if (
      _.isEmpty(_.trim(password)) ||
      _.isEmpty(_.trim(email)) ||
      _.isEmpty(_.trim(phone))
    ) {
      throw new Error({
        text: i18n.__('noEmptyFields'),
        code: 1
      });
    }

    // check if email is valid.
    if (!emailRegex.test(email)) {
      throw new Error({
        text: i18n.__('invalidEmail'),
        code: 1
      });
    }

    // check if phone is valid.
    if (!phoneRegex.test(phone)) {
      throw new Error({
        text: i18n.__('invalidPhone'),
        code: 1
      });
    }

    try {
      // check if user exists
      const user = await User.findOne({ $or: [{ email }, { phone }] });
      if (user) {
        throw new Error({
          text: i18n.__('userAlreadyExists'),
          code: 1
        });
      }

      // hash pass
      const hashedPass = await bcrypt.hash(password, 12);
      const confirmId = uuidv1();

      // create new user
      const newUser = new User({
        email,
        phone,
        username: `user_${uuidv1()}`,
        password: hashedPass,
        confirmId
      });

      // save to database
      const res = await newUser.save();

      const token = createToken(res.id, email, process.env.SECRET_KEY, 1);

      // send a confirmation email to user
      // create email provider.
      const emailProvider = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          type: 'OAuth2',
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_CLIENT_SECRET
        }
      });

      // prepare and send the email
      const mail = await emailProvider.sendMail({
        from: `Shelty App - ${process.env.ADMIN_MAIL}`,
        to: `${email}, sheltyapp@gmail.com`,
        subject: i18n.__('mail.approval.subject'),
        text: i18n.__('mail.approval.text'),
        html: `<b>Aşağıdaki bağlantıya tıklayarak hesabınızı onaylayabilirsiniz.</b><br /><br /><a href="${process.env.FRONTEND_URL}approve/${confirmId}"><b>Hesabı Onayla</b></a>`,
        auth: {
          user: process.env.ADMIN_MAIL,
          refreshToken: process.env.GMAIL_CLIENT_REFRESH_TOKEN,
          accessToken: process.env.GMAIL_CLIENT_ACCESS_TOKEN
        }
      });

      console.log(mail);

      return { ...res._doc, password: null, token };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  confirmAccount: async args => {
    const { confirmId } = args;

    // check if user exists
    try {
      // check if user exists
      const user = await User.findOne({ confirmId });
      if (!user) {
        throw new Error({
          text: i18n.__('invalidConfirmId'),
          code: 1
        });
      }

      if (user.isApproved) {
        throw new Error({
          text: i18n.__('alreadyApproved'),
          code: 1
        });
      }

      // put new token info to user
      await User.updateOne(
        { _id: user.id },
        {
          isApproved: true,
          confirmId: null
        }
      );

      return true;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  forgotPasswordWithEmail: async args => {
    const { email } = args;
    try {
      // validate email
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (_.isEmpty(_.trim(email))) {
        throw new Error({
          text: i18n.__('noEmptyFields'),
          code: 1
        });
      }
      if (!emailRegex.test(email)) {
        throw new Error({
          text: i18n.__('invalidEmail'),
          code: 1
        });
      }

      const user = await User.findOne({ email });

      // if user does not exist, then wrong token is given.
      if (!user) {
        throw new Error({
          text: i18n.__('invalidAccountInfo'),
          code: 1
        });
      }

      // create token to use it to reset password
      const token = createToken(
        user.id,
        user.email,
        process.env.FORGOT_PASSWORD_SECRET_KEY,
        24
      );

      // create email provider.
      const emailProvider = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.ADMIN_EMAIL, // generated ethereal user
          pass: process.env.ADMIN_EMAIL_PASS // generated ethereal password
        }
      });

      // prepare and send the email
      const mail = await emailProvider.sendMail({
        from: `Shelty App - ${process.env.RESET_MAIL}`,
        to: `${user.email}, sheltyapp@gmail.com`,
        subject: i18n.__('mail.reset.subject'),
        text: i18n.__('mail.reset.text'),
        html: `<b>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın.</b><br /><br /><a href="${process.env.FRONTEND_URL}reset-password/${token}"><b>Şifremi Sıfırla</b></a>`
      });

      // put new token info to user
      await User.updateOne(
        { _id: user.id },
        {
          resetPasswordToken: token,
          resetPasswordExpiration: moment().add(24, 'hours')
        }
      );

      return { email, token };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  forgotPasswordWithPhone: async args => {
    const { phone } = args;
    try {
      // validate phone
      const phoneRegex = /5\d{9}/;
      if (_.isEmpty(_.trim(phone))) {
        throw new Error({
          text: i18n.__('noEmptyFields'),
          code: 1
        });
      }
      if (!phoneRegex.test(phone)) {
        throw new Error({
          text: i18n.__('invalidPhone'),
          code: 1
        });
      }

      const user = await User.findOne({ phone });

      // if user does not exist, then wrong token is given.
      if (!user) {
        throw new Error({
          text: i18n.__('invalidAccountInfo'),
          code: 1
        });
      }

      // create token to use it to reset password
      const resetKey = shortId.generate();

      // put new token info to user
      await User.updateOne(
        { _id: user.id },
        {
          resetPasswordToken: resetKey,
          resetPasswordExpiration: moment().add(24, 'hours')
        }
      );

      // TODO: send SMS to user

      return phone;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  resetPassword: async args => {
    const { newPassword, token } = args;

    try {
      const user = await User.findOne({
        resetPasswordToken: token
      });
      if (!user) {
        throw new Error(
          JSON.stringify({
            text: i18n.__('invalidResetRequest'),
            code: 1
          })
        );
      }

      if (moment().isAfter(user.resetPasswordExpiration)) {
        throw new Error(
          JSON.stringify({
            text: i18n.__('resetRequestExpired'),
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
            text: i18n.__('invalidAccountInfo'),
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
