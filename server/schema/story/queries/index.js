const graphql = require("graphql");
const _ = require("lodash");
const StorySchema = require("../types");
const { stories } = require("../../../data.js");
const { GraphQLID } = graphql;
const StoryResolver = require("../resolvers");

const story = {
  type: StorySchema,
  args: { id: { type: GraphQLID } },
  resolve(parent, args, { Models }) {
    return StoryResolver.getStory(args.id);
  }
};

module.exports = {
  storyQuery: story
};
