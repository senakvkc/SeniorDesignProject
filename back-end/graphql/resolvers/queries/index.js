const userQueries = require('./user-queries');

const queries = {
  Query: {
    ...userQueries,
  }
};

module.exports = queries;