const PET_PROFILE_UPLOAD_DIR = '../front-end/public/photos/pet-profile/';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const PHONE_REGEX = /(05|5)([0-9]){9}/;

const SOCKET_EVENTS = Object.freeze({
    USER_CONNECTED: "USER_CONNECTED",
    USER_DISCONNECTED: "USER_DISCONNECTED",
    MESSAGE_RECEIVED: "MESSAGE_RECEIVED",
    MESSAGE_SENT: "MESSAGE_SENT",
    TYPING: "TYPING",
    VERIFY_USER: "VERIFY_USER",
    LOGOUT: "LOGOUT",
    SEND_MESSAGE: "SEND_MESSAGE",
});

const SOCKET_ROOM_KEY = "SOCKET_ROOM_SECRET_KEY";

module.exports = { EMAIL_REGEX, PHONE_REGEX, SOCKET_EVENTS, PET_PROFILE_UPLOAD_DIR };