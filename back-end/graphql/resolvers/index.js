const queries = require('./queries/index');
const mutations = require('./mutations/index');

const resolvers = {
  ...queries,
  ...mutations
};

module.exports = resolvers;
