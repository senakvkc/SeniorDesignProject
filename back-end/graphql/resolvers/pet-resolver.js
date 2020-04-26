const moment = require('moment');
const _ = require('lodash');
const i18n = require('i18n');
const shortId = require('shortid');
const uuidv1 = require('uuid/v1');
const { ObjectId } = require('mongodb');
const { ApolloError, AuthenticationError } = require('apollo-server');
const fs = require('fs')
const { uuid } = require('uuidv4');

const StringUtil = require('../../util/StringUtil');

const User = require('../../models/User');
const Post = require('../../models/Post');
const Animal = require('../../models/Animal');

const { fetchUserData } = require('./common');
const validator = require('../../validator/validator');
const { PET_PROFILE_UPLOAD_DIR } = require('../../constants');

module.exports = {
  //
  // queries
  //

  /* ======================= */
  /* ANIMAL QUERIES            */
  /* ======================= */

  //
  // mutations
  //

  createPet: async ({ createPetInput }, context) => {
    // validate fields.
    const { type, name, age, breed, characteristics, description, gender, image } = createPetInput;

    const newPet = new Animal({
      type,
      name,
      code: uuid(),
      breed,
      ageInterval: age,
      gender,
      animalType,
      description,
      characteristics,
      profileImage: image,
    });

    console.log("new pet saved", newPet);

    return newPet;
  },

  getPostsWithPage: async (args, req) => {
    // TODO: Yetki kontrolü

    if (!isEqual) {
      throw new Error({
        text: i18n.__('invalidAccountInfo'),
        code: 1
      });
    }
  },

  register: async ({ userRegisterInput }) => {
    const { email, username, phone, password } = userRegisterInput;
    console.log(userRegisterInput);
    // validate fields.
    const isFieldsValidated = validator.isFieldsEmpty({
      email,
      phone,
      username,
      password
    });

    // check if given email or phone is valid.
    const isEmailOrPhoneValid = validator.isEmailOrPhoneValid(email, phone);

    const isUsernameValid = validator.isUsernameValid(username);

    // check if user exists
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      throw new ApolloError(i18n.__('userAlreadyExists'), 'ALREADY_EXISTS');
    }

    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      throw new ApolloError(i18n.__('usernameAlreadyExists'), 'ALREADY_EXISTS');
    }

    // if everything is fine, then we can start creating our new user.
    // hash password first!
    const hashedPass = await bcrypt.hash(password, 12);
    // since user has to confirm the new account, we create a new confirmId for the new user.
    const confirmId = uuidv1();

    // create new user
    const newUser = new User({
      email,
      phone,
      username,
      password: hashedPass,
      confirmId
    });

    // save to database
    const res = await newUser.save();

    const token = createToken(res.id, email, process.env.SECRET_KEY);

    // send a confirmation email to user
    // create email provider.
    /* const emailProvider = nodemailer.createTransport({
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
      */
    // TODO: Set password: null
    return {
      userId: res.id,
      token,
      user: res._doc
    };
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
