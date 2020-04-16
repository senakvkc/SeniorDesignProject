const bcrypt = require('bcryptjs');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');
const moment = require('moment');
const _ = require('lodash');
const i18n = require('i18n');
const shortId = require('shortid');
const uuidv1 = require('uuid/v1');
const xoauth2 = require('xoauth2');
const { ObjectId } = require('mongodb');
const { ApolloError, AuthenticationError } = require('apollo-server');
const readline = require('readline');
var TeleSignSDK = require('telesignsdk');
const customerId = '08F5AEEE-0722-4395-ADAA-9DF597CA60C1';
const telesignApiKey = 'cdGejDBZgsC9ExPA+nldxB2EqrrCctEpsHnc/ZREP1xFJxBjC/3dCoJ4Ao8zOHu6AOYnqcoetzJU3HhrEsNDLQ==';
const rest_endpoint = 'https://rest-api.telesign.com';
const timeout = 10 * 1000; // 10 secs

const validator = require('../../../validator/validator');
const { createToken, createCode } = require('../../../util/TokenUtil');
const User = require('../../../models/User');
const ERROR_TYPES = require('../../../errorTypes');
const { PHONE_REGEX, EMAIL_REGEX } = require('../../../constants');

const client = new TeleSignSDK(
  customerId,
  telesignApiKey,
  rest_endpoint,
  timeout // optional
  // userAgent
);

const userMutations = {
  login: async (_, { phone, password }) => {
    // validate fields.
    const isFieldsValidated = validator.isFieldsEmpty({
      phone,
      password,
    });

    console.log(phone, password);

    // check if given email or phone is valid.
    const isPhoneValid = validator.validateWithRegex(PHONE_REGEX, phone, i18n.__('invalidPhone'));

    // if everything is validated, then check if user actually exists.
    const user = await User.findOne({ phone });
    if (!user) {
      throw new AuthenticationError(ERROR_TYPES.AUTHENTICATION_ERROR.text, ERROR_TYPES.AUTHENTICATION_ERROR.code);
    }

    const { isActive, isBlocked, phoneConfirmed } = user;
    console.log(user);
    if (!isActive || isBlocked) {
      throw new AuthenticationError(ERROR_TYPES.USER_BLOCKED_OR_NOT_ACTIVE.text, ERROR_TYPES.USER_BLOCKED_OR_NOT_ACTIVE.code);
    }


    if (!phoneConfirmed) {
      throw new AuthenticationError(ERROR_TYPES.USER_NOT_CONFIRMED.text, ERROR_TYPES.USER_NOT_CONFIRMED.code);
    }

    // if everything is fine, we can create token now.
    const token = createToken(user.id, user.email, user.phone, process.env.SECRET_KEY);

    // return logged in user data.
    return {
      userId: user.id,
      token,
      user,
    };
  },
  
  register: async (_, { userRegisterInput }) => {
    const { email, phone, password, name, surname } = userRegisterInput;

    const isEmpty = validator.isFieldsEmpty(userRegisterInput);
    const isPhoneValidated = validator.validateWithRegex(PHONE_REGEX, phone, i18n.__('invalidPhone'));
    const isEmailValidated = validator.validateWithRegex(EMAIL_REGEX, email, i18n.__('invalidEmail'));
    const isPasswordValidated = validator.validatePassword(password, i18n.__('tooShortPassword'));

    const isValidated = !isEmpty && isPhoneValidated && isEmailValidated && isPasswordValidated;

    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (user) {
      throw new ApolloError(ERROR_TYPES.USER_ALREADY_EXISTS.text, ERROR_TYPES.USER_ALREADY_EXISTS.code);
    }

    const hashedPass = await bcrypt.hash(password, 12);
    const confirmId = uuidv1();
    const phoneCode = createCode();
    // const username = generateUsername();

    // create new user
    const newUser = new User({
      email,
      phone,
      username: email,
      password: hashedPass,
      confirmId,
      firstName: name,
      lastName: surname,
      phoneCode,
    });

    // save to database
    const res = await newUser.save();

    // generate token
    const token = createToken(res.id, email, phone, process.env.SECRET_KEY);

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

      // send activation code to phone
      const messageType = 'ARN';
      const message = i18n.__('approveCodeMessage', { phoneCode });

      const smsMessage = client.sms.message(
        (error, responseBody) => {
          if (error === null) {
            /* if (responseBody && responseBody.status.code > 10000) {
              throw new ApolloError(ERROR_TYPES.MESSAGE_PROVIDER_ERROR.text, ERROR_TYPES.MESSAGE_PROVIDER_ERROR.code);
            } */
            return true;
          } else {
            throw new ApolloError(ERROR_TYPES.MESSAGE_PROVIDER_ERROR.text, ERROR_TYPES.MESSAGE_PROVIDER_ERROR.code);
          }
        },
        phone,
        message,
        messageType
      );
    
    return {
      userId: res.id,
      token,
      user: res._doc,
    };
  },

  activateAccountWithPhone: async (_, { phone, phoneCode }) => {
    const user = User.findOne({ phone, phoneCode });
    if (!user) {
      throw new ApolloError(ERROR_TYPES.NO_USER_FOUND.text, ERROR_TYPES.NO_USER_FOUND.code)
    }

    const { phoneCode: userPhoneCode } = user;

    if (userPhoneCode !== phoneCode) {
      throw new ApolloError(ERROR_TYPES.INVALID_PHONE_CODE.text, ERROR_TYPES.INVALID_PHONE_CODE.code);
    }

    const isUpdated = User.updateOne({ phone }, { isActive: true, phoneConfirmed: true });
    console.log(isUpdated);
    
    return true;
  },
  // confirmAccount: async args => {
  //   const { confirmId } = args;

  //   // check if user exists
  //   try {
  //     // check if user exists
  //     const user = await User.findOne({ confirmId });
  //     if (!user) {
  //       throw new Error({
  //         text: i18n.__('invalidConfirmId'),
  //         code: 1
  //       });
  //     }

  //     if (user.isApproved) {
  //       throw new Error({
  //         text: i18n.__('alreadyApproved'),
  //         code: 1
  //       });
  //     }

  //     // put new token info to user
  //     await User.updateOne(
  //       { _id: user.id },
  //       {
  //         isApproved: true,
  //         confirmId: null
  //       }
  //     );

  //     return true;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // },

  // 1. validate phone
  // 2. check if user exists
  // 3. check if user is able to request new code
  // 4. create code and expiration
  // 5. update user
  // 6. send message
  // 7. return true
  forgotPasswordWithPhone: async (_, args) => {
    const { phone } = args;
    // 1.
    const phoneRegex = /(05|5)([0-9]){9}/;
    if (!phoneRegex.test(phone)) {
      throw new ApolloError(i18n.__('invalidPhone'), 'INVALID_INPUT');
    }

    // 2.
    const actualPhone = phone.substring(2);
    const user = await User.findOne({ phone: actualPhone });
    if (!user) {
      throw new ApolloError(i18n.__('userNotExist'), 'USER_NOT_EXIST');
    }

    // 3.
    const { resetPasswordCodeExpiration } = user;
    if (moment().isAfter(moment(resetPasswordCodeExpiration))) {
      // 4.
      const code = createCode();
      const expiration = moment().add(5, 'minutes');

      // 5.
      const updatedUser = await User.updateOne(
        { phone: actualPhone },
        { resetPasswordCode: code, resetPasswordCodeExpiration: expiration }
      );

      // 6.
      const messageType = 'ARN';
      const message = i18n.__('resetPasswordCodeMessage', { code });

      client.sms.message(
        (error, responseBody) => {
          if (error === null) {
            if (responseBody && responseBody.status.code > 10000) {
              throw new ApolloError(i18n.__('messageProviderError', 'MESSAGE_PROVIDER_ERROR'));
            }
            return true;
          } else {
            throw new ApolloError(i18n.__('messageProviderError', 'MESSAGE_PROVIDER_ERROR'));
          }
        },
        phone,
        message,
        messageType
      );

      // 7.
      return true;
    } else {
      throw new ApolloError(i18n.__('codeAlreadyExist'), 'CODE_ALREADY_EXIST');
    }
  },

  resetPassword: async (_, args) => {
    const { phone, code, newPassword } = args;
    
    const phoneRegex = /(05|5)([0-9]){9}/;
    if (!phoneRegex.test(phone)) {
      throw new ApolloError(i18n.__('invalidPhone'), 'INVALID_INPUT');
    }

    console.log(phone, code, newPassword);

    const isEmpty = validator.isFieldsEmpty({
      phone,
      code,
      newPassword
    });

    if (isEmpty) {
      throw new ApolloError(i18n.__('noEmptyFields'), 'INVALID_INPUT');
    }

    if (newPassword.length < 6) {
      throw new ApolloError(i18n.__('tooShortPassword'), 'INVALID_INPUT');
    }

    // 2.
    const actualPhone = phone.substring(2);
    const user = await User.findOne({ phone: actualPhone, resetPasswordCode: code });
    if (!user) {
      throw new ApolloError(i18n.__('invalidResetPasswordCode'), 'INVALID_CODE');
    }

    // 3.
    const { resetPasswordCodeExpiration } = user;
    if (moment().isAfter(moment(resetPasswordCodeExpiration))) {
      throw new ApolloError(i18n.__('expiredCode'), 'EXPIRED_CODE');
    } else {
      const hashedPass = await bcrypt.hash(newPassword, 12);
      await User.updateOne({ phone }, { password: hashedPass, resetPasswordCodeExpiration: moment() });
      return true;
    }
  },

  // 1. check if user exists.
  // 2. get code and check if code is correct
  checkResetPasswordCode: async (_, args, req) => {
    const { phone, code } = args;

    const user = await User.findOne({ phone });
    if (!user) {
      throw new ApolloError(i18n.__('userNotExist'), 'USER_NOT_EXIST');
    }

    console.log(user);
    const { resetPasswordCode } = user;
    return code === resetPasswordCode;
  },

  activateAccount: async (_, args, req) => {
    const { phone, code } = args;

    const user = await User.findOne({ phone });
    if (!user) {
      throw new ApolloError(ERROR_TYPES.NO_USER_FOUND.text, ERROR_TYPES.NO_USER_FOUND.code);
    }

    const { isBlocked, phoneConfirmed, phoneCode } = user;

    if (isBlocked) {
      throw new AuthenticationError(ERROR_TYPES.USER_BLOCKED_OR_NOT_ACTIVE.text, ERROR_TYPES.USER_BLOCKED_OR_NOT_ACTIVE.code);
    }

    if (phoneConfirmed) {
      throw new AuthenticationError(ERROR_TYPES.PHONE_ALREADY_CONFIRMED.text, ERROR_TYPES.PHONE_ALREADY_CONFIRMED.code);
    }

    if (code !== phoneCode) {
      throw new AuthenticationError(ERROR_TYPES.INVALID_PHONE_CODE.text, ERROR_TYPES.INVALID_PHONE_CODE.code);
    }

    User.updateOne({ phone }, { phoneConfirmed: true, isActive: true });

    return true;
  },

  // forgotPasswordWithEmail: async args => {
  //   const { email } = args;
  //   try {
  //     // validate email
  //     const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     if (_.isEmpty(_.trim(email))) {
  //       throw new Error({
  //         text: i18n.__('noEmptyFields'),
  //         code: 1
  //       });
  //     }
  //     if (!emailRegex.test(email)) {
  //       throw new Error({
  //         text: i18n.__('invalidEmail'),
  //         code: 1
  //       });
  //     }

  //     const user = await User.findOne({ email });

  //     // if user does not exist, then wrong token is given.
  //     if (!user) {
  //       throw new Error({
  //         text: i18n.__('invalidAccountInfo'),
  //         code: 1
  //       });
  //     }

  //     // create token to use it to reset password
  //     const token = createToken(user.id, user.email, process.env.FORGOT_PASSWORD_SECRET_KEY, 24);

  //     // create email provider.
  //     const emailProvider = nodemailer.createTransport({
  //       host: 'smtp.gmail.com',
  //       port: 587,
  //       secure: false, // true for 465, false for other ports
  //       auth: {
  //         user: process.env.ADMIN_EMAIL, // generated ethereal user
  //         pass: process.env.ADMIN_EMAIL_PASS // generated ethereal password
  //       }
  //     });

  //     // prepare and send the email
  //     const mail = await emailProvider.sendMail({
  //       from: `Shelty App - ${process.env.RESET_MAIL}`,
  //       to: `${user.email}, sheltyapp@gmail.com`,
  //       subject: i18n.__('mail.reset.subject'),
  //       text: i18n.__('mail.reset.text'),
  //       html: `<b>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın.</b><br /><br /><a href="${process.env.FRONTEND_URL}reset-password/${token}"><b>Şifremi Sıfırla</b></a>`
  //     });

  //     // put new token info to user
  //     await User.updateOne(
  //       { _id: user.id },
  //       {
  //         resetPasswordToken: token,
  //         resetPasswordExpiration: moment().add(24, 'hours')
  //       }
  //     );

  //     return { email, token };
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // },

  // forgotPasswordWithPhone: async args => {
  //   const { phone } = args;
  //   try {
  //     // validate phone
  //     const phoneRegex = /5\d{9}/;
  //     if (_.isEmpty(_.trim(phone))) {
  //       throw new Error({
  //         text: i18n.__('noEmptyFields'),
  //         code: 1
  //       });
  //     }
  //     if (!phoneRegex.test(phone)) {
  //       throw new Error({
  //         text: i18n.__('invalidPhone'),
  //         code: 1
  //       });
  //     }

  //     const user = await User.findOne({ phone });

  //     // if user does not exist, then wrong token is given.
  //     if (!user) {
  //       throw new Error({
  //         text: i18n.__('invalidAccountInfo'),
  //         code: 1
  //       });
  //     }

  //     // create token to use it to reset password
  //     const resetKey = shortId.generate();

  //     // put new token info to user
  //     await User.updateOne(
  //       { _id: user.id },
  //       {
  //         resetPasswordToken: resetKey,
  //         resetPasswordExpiration: moment().add(24, 'hours')
  //       }
  //     );

  //     // TODO: send SMS to user

  //     return phone;
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // },

  // resetPassword: async args => {
  //   const { newPassword, token } = args;

  //   try {
  //     const user = await User.findOne({
  //       resetPasswordToken: token
  //     });
  //     if (!user) {
  //       throw new Error(
  //         JSON.stringify({
  //           text: i18n.__('invalidResetRequest'),
  //           code: 1
  //         })
  //       );
  //     }

  //     if (moment().isAfter(user.resetPasswordExpiration)) {
  //       throw new Error(
  //         JSON.stringify({
  //           text: i18n.__('resetRequestExpired'),
  //           code: 2
  //         })
  //       );
  //     }

  //     const hashedPass = await bcrypt.hash(newPassword, 12);

  //     await User.updateOne(
  //       { _id: user.id },
  //       {
  //         password: hashedPass,
  //         resetPasswordToken: null,
  //         resetPasswordExpiration: null
  //       }
  //     );

  //     return { ...user._doc, password: null };
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // },

  // changeProfilePhoto: async (args, req) => {
  //   const { userId } = args;
  //   try {
  //     const user = await User.findById(userId);
  //     if (!user) {
  //       throw new Error(
  //         JSON.stringify({
  //           text: i18n.__('invalidAccountInfo'),
  //           code: 1
  //         })
  //       );
  //     }

  //     console.log(req.files);

  //     return user;

  //     /*
  //     await User.update(
  //       { _id: user.id },
  //       {
  //         profilePicture: {
  //           data: fs.readFileSync(req.file.profilePhoto.path),
  //           contentType: 'image/png'
  //         }
  //       }
  //       );
  //    */

  //     return user;

  //     return { ...user._doc, password: null };
  //   } catch (err) {
  //     console.log(err);
  //     throw err;
  //   }
  // }
};

module.exports = userMutations;
