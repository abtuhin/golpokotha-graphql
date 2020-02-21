const graphql = require("graphql");
const _ = require("lodash");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = graphql;
const StorySchema = require("../../story/types");
const Paging = require("../../paging");

const CategorySchema = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    stories: {
      type: Paging.pagingType({ name: "CategoryStory", schema: StorySchema }),
      args: Paging.pagingArg,
      resolve: (
        parent,
        { first = null, skip = null, ...args },
        { Models, user }
      ) => {
        return {
          items: Models.Story.find({ category: parent.id })
            .skip(skip)
            .limit(first),
          count: Models.Story.find({ category: parent.id }).count()
        };
      }
    }
  })
});

module.exports = CategorySchema;
