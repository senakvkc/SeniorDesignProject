const { uuid } = require("uuidv4");

const io = require('../server').io;
const SOCKET_EVENTS = require('../constants');
const { createUser, createMessage, createChat } = require('./Socket');

let rooms = [];
let connectedUsers = {};

module.exports = function (socket) {
    console.log("Socket id: ", socket.id);
    const id = uuid();

    socket.on(SOCKET_EVENTS.VERIFY_USER, ({ roomId, from }, cb) => {
        if(isUserVerified(roomId, from)) {
            return true
        } else {
            return cb({ error: 'User is not verified.' });
        };
    });

    socket.on(SOCKET_EVENTS.USER_CONNECTED, (from, target) => {
        from.socketId = socket.id;
        target.socketId = socket.id;
        socket.user = user;

        io.emit(SOCKET_EVENTS.USER_CONNECTED, (user));
        console.log(connectedUsers, user);
    });

    socket.on('disconnect', () => {
        if (socket.user) {

            io.emit(SOCKET_EVENTS.USER_DISCONNECTED, user);
            console.log("User disconnected: ", user);
        }
    })
}