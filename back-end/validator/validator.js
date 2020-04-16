const _ = require('lodash');
const i18n = require('i18n');
const { ApolloServer, UserInputError } = require('apollo-server');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex = /(05|5)([0-9]){9}/;

const usernameRegex = /^[A-Za-z0-9]+(?:[A-Za-z0-9_]+)*$/;

module.exports = {
  validateWithRegex: (regex, value, error) => {
    if (!_.isEqual(_.first(regex.exec(value)), value)) {
      throw new UserInputError(error);
    }

    return true;
  },

  isFieldsEmpty: fieldsObject => {
    const fields = Object.keys(fieldsObject);
    const isEmpty = _.some(fields, field => _.isEmpty(_.trim(fieldsObject[field])));

    if (isEmpty) {
      throw new UserInputError(i18n.__('noEmptyFields'));
    }

    return false;
  },

  validatePassword: (password, error) => {
    if (password.length < 6) {
      throw new UserInputError(error);
    }

    return true;
  },

  validateForRegistration: fields => {
    const { email, phone, password, name, surname } = fields;

    // is empty check
    const isEmpty = isFieldsEmpty(fields);
    const isPhoneValidated = validateWithRegex(phoneRegex, phone, i18n.__('invalidPhone'));
    const isEmailValidated = validateWithRegex(emailRegex, email, i18n.__('invalidEmail'));
    const isPasswordValidated = validatePassword(password, i18n.__('tooShortPassword'));

    return !isEmpty && isPhoneValidated && isEmailValidated && isPasswordValidated;
  }
};
