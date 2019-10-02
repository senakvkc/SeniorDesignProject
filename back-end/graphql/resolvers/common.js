const User = require('../../models/User');
const DataLoader = require('dataloader');
const _ = require('lodash');

const userLoader = new DataLoader(userIds => {
  return users(userIds);
});

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const users = async userIds => {
  try {
    const users = await User.find({ _id: { $in: userIds } });
    return users.map(user => {
      return fetchUserData(user);
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const fetchUserData = user => {
  return {
    ...user._doc
  };
};

exports.user = user;
exports.fetchUserData = fetchUserData;
