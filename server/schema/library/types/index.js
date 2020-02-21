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

const LibrarySchema = new GraphQLObjectType({
  name: "Library",
  fields: () => ({
    id: { type: GraphQLID },
    stories: {
      type: new GraphQLList(require("../../story/types")),
      resolve(parent, args, { Models, user }) {
        return Models.Library.findOne({ user: user.id }).then(res => {
          return res.stories;
        });
      }
    }
  })
});

module.exports = LibrarySchema;
