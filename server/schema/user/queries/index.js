const graphql = require("graphql");
const _ = require("lodash");
const UserSchema = require("../types");
const { GraphQLID } = graphql;

const user = {
  type: UserSchema,
  args: { id: { type: GraphQLID } },
  resolve(parent, args, { Models }) {
    return Models.User.findById(args.id);
  }
};

module.exports = {
  userQuery: user
};
