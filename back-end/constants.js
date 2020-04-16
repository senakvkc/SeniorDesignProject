module.exports = PET_PROFILE_UPLOAD_DIR = '../front-end/public/photos/pet-profile/';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PHONE_REGEX = /(05|5)([0-9]){9}/;

module.exports = { EMAIL_REGEX, PHONE_REGEX };