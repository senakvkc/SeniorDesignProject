const i18n = require('i18n');

const ERROR_TYPES = Object.freeze({
  USER_ALREADY_EXISTS: {
    text: i18n.__('userAlreadyExist'),
    code: 'USER_ALREADY_EXISTS'
  },
  NO_USER_FOUND: {
  	text: i18n.__('noUserFound'),
  	code: 'NO_USER_FOUND'
  },
  MESSAGE_PROVIDER_ERROR: {
  	text: i18n.__('messageProviderError'),
  	code :'MESSAGE_PROVIDER_ERROR'
  },
  INVALID_PHONE_CODE: {
  	text: i18n.__('invalidPhoneCode'),
  	code: 'INVALID_PHONE_CODE'
  },
  AUTHENTICATION_ERROR: {
    text: i18n.__('invalidAccountInfo'),
    code: 'AUTHENTICATION_ERROR'
  },
  USER_BLOCKED_OR_NOT_ACTIVE: {
    text: i18n.__('userBlockedOrNotActive'),
    code: 'USER_BLOCKED_OR_NOT_ACTIVE'
  },
  USER_NOT_CONFIRMED: {
    text: i18n.__('userNotConfirmed'),
    code: 'USER_NOT_CONFIRMED'
  },
  PHONE_ALREADY_CONFIRMED: {
    text: i18n.__('phoneAlreadyConfirmed'),
    code: 'PHONE_ALREADY_CONFIRMED'
  },
  NOT_LOGGED_IN_ERROR: {
    text: i18n.__('userNotLoggedIn'),
    code: 'NOT_LOGGED_IN_ERROR'
  }
});

module.exports = ERROR_TYPES;