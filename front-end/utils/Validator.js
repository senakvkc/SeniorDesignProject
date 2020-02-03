import React from 'react';
import _ from 'lodash';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex = /(05|5)([0-9]){9}/;
const usernameRegex = /^[A-Za-z0-9]+(?:[A-Za-z0-9_]+)*$/;

/*
export const validateEmail = email => {
  console.log('validating email!');
  if (!_.isEqual(_.first(emailRegex.exec(email)), email)) {
    console.log('invalid email');
    return false;
  }

  console.log('email validated.');
  return true;
};

export const validatePhone = phone => {
  console.log('validating phone!');
  if (!_.isEqual(_.first(phoneRegex.exec(phone)), phone)) {
    console.log('invalid phone');
    return false;
  }

  console.log('phone validated.');
  return true;
};
*/

export const validateUsername = username => {
  console.log('validating username.');
  if (!_.isEqual(_.first(usernameRegex.exec(username)), username)) {
    console.log('invalid username');
    return false;
  }

  console.log('username validated.');
  return true;
};

export const validateEmptyFields = fields => {
  console.log('validating empty fields.', fields);
  console.log(_.some(Object.keys(fields), field => _.isEmpty(_.trim(fields[field]))));
  return _.some(Object.keys(fields), field => _.isEmpty(_.trim(fields[field])));
};

const validateEmail = value => {
  console.log('Validating email...');
  if (_.isEmpty(_.trim(value))) {
    console.log('Empty email.');
    return 'E-posta adresi zorunlu.';
  }

  if (!_.isEqual(_.first(emailRegex.exec(value)), value)) {
    console.log('Invalid email.');
    return 'Geçersiz e-posta adresi.';
  }

  console.log('Email validated.');
  return null;
};

const validatePhone = value => {
  console.log('Validating phone...');
  if (_.isEmpty(_.trim(value))) {
    console.log('Empty phone.');
    return 'Telefon adresi zorunlu.';
  }

  if (!_.isEqual(_.first(phoneRegex.exec(value)), value)) {
    console.log('Invalid phone.');
    return 'Geçersiz telefon numarası.';
  }

  console.log('Phone validated.');
  return null;
};

const validatePassword = value => {
  if (_.isEmpty(_.trim(value))) {
    return 'Şifre zorunlu.';
  }

  if (value.length < 6) {
    return 'Şifre en az 6 karakter olmalı.';
  }

  console.log('Password validated.');
  return null;
};

export const validateField = (value, type) => {
  console.log(value, type);
  if (_.isEqual(type, 'email')) {
    return { validated: false, email: validateEmail(value) };
  } else if (_.isEqual(type, 'phone')) {
    return { validated: false, phone: validatePhone(value) };
  } else if (_.isEqual(type, 'password')) {
    return { validated: false, password: validatePassword(value) };
  }

  return { validated: true };
};

export const validateFields = fields => {
  console.log('Validating fields...');
  let errors = {};
  _.forEach(Object.keys(fields), field => {
    const result = validateField(fields[field], field);
    console.log('result', result);
    if (!result.validated) {
      errors[field] = result[field];
      console.log('errors:', errors);
    }
  });

  return errors;
};
