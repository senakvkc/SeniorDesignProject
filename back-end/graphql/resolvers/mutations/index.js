const userMutations = require('./user-mutations');
const animalMutations = require('./animal-mutations');

const mutations = {
  Mutation: {
    ...userMutations,
    ...animalMutations
  }
};

module.exports = mutations;