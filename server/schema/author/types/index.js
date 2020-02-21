const graphql = require("graphql");
const _ = require("lodash");
const { stories, authors, reviews } = require("../../../data.js");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;
const AuthorResolver = require("../resolvers");

const AuthorSchema = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    fbId: { type: GraphQLID },
    profileImage: { type: GraphQLString },
    stories: {
      type: new GraphQLList(require("../../story/types")), // to avoid circular dependency
      resolve(parent, args) {
        return AuthorResolver.getAuthorStories(parent, args);
      }
    }
    // reviews: {
    //   type: new GraphQLList(require("../../review/types")), // to avoid circular dependency
    //   resolve(parent, args) {
    //     return AuthorResolver.getAuthorReviews(parent, args);
    //   }
    // }
  })
});

module.exports = AuthorSchema;
