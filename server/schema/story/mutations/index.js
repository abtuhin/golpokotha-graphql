const graphql = require("graphql");
const _ = require("lodash");
const StorySchema = require("../types");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = graphql;
const StoryResolver = require("../resolvers");

const addStory = {
  type: StorySchema,
  args: {
    title: { type: GraphQLString },
    category: { type: new GraphQLList(GraphQLID) },
    pdf: { type: GraphQLString },
    imageUrl: { type: GraphQLString }
  },
  resolve(parent, args, { Models, user }) {
    return StoryResolver.addStory(parent, args, user);
  }
};

const incrementStoryView = {
  type: StorySchema,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, args) {
    return StoryResolver.incrementStoryView(parent, args);
  }
};

const incrementStoryLove = {
  type: StorySchema,
  args: {
    id: { type: GraphQLID }
  },
  resolve(parent, args) {
    return StoryResolver.incrementStoryLove(parent, args);
  }
};

module.exports = {
  addStory: addStory,
  incrementStoryView: incrementStoryView,
  incrementStoryLove: incrementStoryLove
};
