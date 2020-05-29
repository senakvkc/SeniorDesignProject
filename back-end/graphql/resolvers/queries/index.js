const userQueries = require('./user-queries');
const animalQueries = require('./animal-queries');

const queries = {
  Query: {
    ...userQueries,
    ...animalQueries
  }
};

module.exports = queries;