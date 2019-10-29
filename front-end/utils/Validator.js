import React from 'react';
import _ from 'lodash';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex = /(05|5)([0-9]){9}/;
const usernameRegex = /^[A-Za-z0-9]+(?:[A-Za-z0-9_]+)*$/;

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

export const validateUsername = username => {
  console.log('validating username.');
  if (!_.isEqual(_.first(usernameRegex.exec(username)), username)) {
    console.log('invalid username');
    return false;
  }

  console.log('username validated.');
  return true;
};

export const validateEmptyFields = fieldsObject => {
  console.log('validating empty fields.');
  const fields = Object.keys(fieldsObject);
  const isEmpty = _.some(fields, field =>
    _.isEmpty(_.trim(fieldsObject[field]))
  );

  return isEmpty;
};
