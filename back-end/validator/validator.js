const _ = require('lodash');
const i18n = require('i18n');
const { ApolloServer, UserInputError } = require('apollo-server');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex = /(05|5)([0-9]){9}/;

const usernameRegex = /^[A-Za-z0-9]+(?:[A-Za-z0-9_]+)*$/;

module.exports = {
  isEmailOrPhoneValid: (email, phone) => {
    console.log('validating email or phone');
    if (
      !_.isEqual(_.first(emailRegex.exec(email)), email) &&
      !_.isEqual(_.first(phoneRegex.exec(phone)), phone)
    ) {
      console.log('invalid regex');
      throw new UserInputError(i18n.__('invalidEmailOrPhone'), {
        invalidArgs: ['email', 'phone']
      });
    }

    console.log('regex validated.');
    return true;
  },

  isFieldsEmpty: fieldsObject => {
    const fields = Object.keys(fieldsObject);
    const isEmpty = _.some(fields, field =>
      _.isEmpty(_.trim(fieldsObject[field]))
    );

    if (isEmpty) {
      console.error({
        text: i18n.__('noEmptyFields'),
        code: 1
      });
      throw new UserInputError(i18n.__('noEmptyFields'));
    }

    console.log('empty fields validated!');
    return isEmpty;
  },

  isUsernameValid: username => {
    if (!_.isEqual(_.first(usernameRegex.exec(username)), username)) {
      console.log('invalid regex');
      throw new UserInputError(i18n.__('invalidUsername'));
    }

    console.log('regex validated.');
    return true;
  }
};
