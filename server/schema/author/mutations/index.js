const graphql = require("graphql");
const _ = require("lodash");
const AuthorSchema = require("../types");
const { stories, authors, reviews } = require("../../../data.js");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = graphql;
const AuthorResolver = require("../resolvers");

const addAuthor = {
  type: AuthorSchema,
  args: {
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    profileImage: { type: GraphQLString }
  },
  resolve(parent, args, { Models, user }) {
    return AuthorResolver.addAuthor(parent, args, user);
  }
};

module.exports = {
  addAuthor: addAuthor
};
