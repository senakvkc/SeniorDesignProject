const _ = require('lodash');
const { uuid } = require("uuidv4");

var rooms = [];

const getRoomOfUsersOrCreate = (from, target) => {
    const room = rooms.find(r => r.from.id === from.id && r.target.id === target.id);
    if (room) {
        return room;
    }
    const newRoom = { roomId: uuid(), from, target };
    rooms.push(room);
    return newRoom;
};

const removeRoom = (roomId) => _.remove(rooms, r => r.roomId === roomId);

const getRoomWithId = (roomId) => _.find(rooms, r => r.roomId === roomId); 

const getUsers = ({ roomId }) => {
    const room = rooms.find(r => r.roomId === roomId);
    return { from: room.from, target: room.target };
};

const isUserVerified = (roomId, user) => {
    const room = getRoomWithId(roomId);
    return user.id === room.from.id;
};

module.exports = { rooms, getRoomOfUsersOrCreate, getUsers, removeRoom, getRoomWithId, isUserVerified, getRoomOfUsers };