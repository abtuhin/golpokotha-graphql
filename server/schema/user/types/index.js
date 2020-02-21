const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const UserSchema = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    userId: { type: GraphQLString },
    profileImage: { type: GraphQLString },
    token: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    reviews: {
      type: new GraphQLList(require("../../review/types")), // to avoid circular dependency
      resolve(parent, args, { Models }) {
        return Models.Review.find({ userId: parent.id });
      }
    }
  })
});

module.exports = UserSchema;
