const userResolver = require('./user-resolver');
const shelterResolver = require('./shelter-resolver');

const rootResolver = {
  ...userResolver,
  ...shelterResolver
};

module.exports = rootResolver;
