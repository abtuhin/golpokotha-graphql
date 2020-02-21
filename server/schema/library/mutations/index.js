const graphql = require("graphql");
const _ = require("lodash");
const LibrarySchema = require("../types");

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = graphql;

const addToLibrary = {
  type: LibrarySchema,
  args: {
    storyId: { type: GraphQLID }
  },
  resolve(parent, args, { Models, user }) {
    return Models.Library.findOne({ user: user.id }).then(async library => {
      if (!library) {
        let lib = {
          user: user.id,
          stories: []
        };
        let story_data = await Models.Story.findOne({ _id: args.storyId });
        lib.stories.push(story_data);
        let Lib = new Models.Library(lib);
        return Lib.save();
      } else {
        let story_data = await Models.Story.findOne({ _id: args.storyId });

        library.stories.push(story_data);
        return library.save();
      }
    });
  }
};

module.exports = {
  addToLibrary: addToLibrary
};
