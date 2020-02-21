const graphql = require("graphql");
const _ = require("lodash");
const { stories, authors, reviews } = require("../../../data.js");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
  GraphQLInt
} = graphql;
const AuthorResolver = require("../../author/resolvers");
const StoryResolver = require("../../story/resolvers");

const ReviewSchema = new GraphQLObjectType({
  name: "Review",
  fields: () => ({
    id: { type: GraphQLID },
    rating: { type: GraphQLFloat },
    comment: { type: GraphQLString },
    user: {
      type: require("../../user/types"), // to avoid circular dependency
      resolve(parent, args, { Models }) {
        return Models.User.findById(parent.userId);
      }
    },
    story: {
      type: require("../../story/types"), // to avoid circular dependency
      resolve(parent, args) {
        return StoryResolver.getStory(parent.storyId);
      }
    }
  })
});

module.exports = ReviewSchema;
