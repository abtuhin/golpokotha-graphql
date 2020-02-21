const graphql = require("graphql");
const _ = require("lodash");
const ReviewSchema = require("../types");
const { GraphQLString, GraphQLFloat, GraphQLID } = graphql;
const Review = require("../../../models/Review.js");
const ReviewResolver = require("../resolvers");

const addReview = {
  type: ReviewSchema,
  args: {
    rating: { type: GraphQLFloat },
    comment: { type: GraphQLString },
    storyId: { type: GraphQLID }
  },
  resolve(parent, args, { Models, user }) {
    return ReviewResolver.addReview(parent, args, user);
  }
};

module.exports = {
  addReview: addReview
};
