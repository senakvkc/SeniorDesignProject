import React from 'react';
import _ from 'lodash';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const phoneRegex = /(05|5)([0-9]){9}/;
const usernameRegex = /^[A-Za-z0-9]+(?:[A-Za-z0-9_]+)*$/;

// checking if all fields are non-empty.
export const validateEmptyFields = fields => _.some(Object.keys(fields), field => _.isEmpty(_.trim(fields[field])));

export const validateWithRegex = (regex, value) => _.isEqual(_.first(regex.exec(value)), value)

// validating email.
export const validateEmail = value => {
  const isEmpty = validateEmptyFields({ value });
  if (isEmpty) {
    return 'E-posta adresi zorunlu.';
  }

  const isValid = validateWithRegex(emailRegex, value);
  if (!isValid) {
    return 'Geçersiz e-posta adresi.';
  }

  return null;
};

export const validatePhone = value => {
  const isEmpty = validateEmptyFields({ value });
  if (isEmpty) {
    return 'Telefon zorunlu.';
  }

  const isValid = validateWithRegex(phoneRegex, value);
  if (!isValid) {
    return 'Geçersiz telefon numarası.';
  }

  return null;
};

export const validatePassword = value => {
  const isEmpty = validateEmptyFields({ value });
  if (isEmpty) {
    return 'Şifre zorunlu.';
  }

  if (value.length < 6) {
    return 'Şifre en az 6 karakter olmalı.';
  }

  return null;
};

export const validateField = (value, type) => {
  if (_.isEqual(type, 'email')) {
    return validateEmail(value);
  } else if (_.isEqual(type, 'phone')) {
    return validatePhone(value);
  } else if (_.isEqual(type, 'password')) {
    return validatePassword(value);
  } else {
    return validateEmptyFields({ value });
  }

  return true;
};

export const validateFields = fields => {
  for (let i = 0; i < fields.length; i++) {
    const validationResult = validateField(fields[i].value, fields[i].type);
    console.log("field", fields[i]);
    if (validationResult !== null) {
      console.log("vr", validationResult);
      return validationResult;
    }
  }

  return null;
};
