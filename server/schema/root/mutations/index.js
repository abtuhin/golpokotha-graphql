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

const {
  addStory,
  incrementStoryView,
  incrementStoryLove
} = require("../../story/mutations");
const { addAuthor } = require("../../author/mutations");
const { addReview } = require("../../review/mutations");
const { addCategory } = require("../../category/mutations");
const { addToLibrary } = require("../../library/mutations");
const { addUser } = require("../../user/mutations");

const RootMutations = {
  name: "Mutation",
  fields: {
    addUser: addUser,
    addStory: addStory,
    addAuthor: addAuthor,
    addReview: addReview,
    addCategory: addCategory,
    addToLibrary: addToLibrary,
    incrementStoryView: incrementStoryView,
    incrementStoryLove: incrementStoryLove
  }
};

module.exports = RootMutations;
