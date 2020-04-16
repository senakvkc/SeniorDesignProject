const userMutations = require('./user-mutations');

const mutations = {
  Mutation: {
    ...userMutations
  }
};

module.exports = mutations;