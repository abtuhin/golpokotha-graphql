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

const { storyQuery } = require("../../story/queries");
const { authorQuery } = require("../../author/queries");
const { reviewQuery } = require("../../review/queries");
const { categoryQuery } = require("../../category/queries");
const { userQuery } = require("../../user/queries");
const { libraryQuery } = require("../../library/queries");

const StorySchema = require("../../story/types");
const AuthorSchema = require("../../author/types");
const ReviewSchema = require("../../review/types");
const CategorySchema = require("../../category/types");
const LibrarySchema = require("../../library/types");

const Paging = require("../../paging");

const RootQueries = {
  name: "RootQueryType",
  fields: {
    story: storyQuery,
    author: authorQuery,
    review: reviewQuery,
    user: userQuery,
    category: categoryQuery,
    library: libraryQuery,
    stories: {
      type: Paging.pagingType({ name: "Story", schema: StorySchema }),
      args: Paging.pagingArg,
      resolve: (parent, { first = null, skip = null }, { Models, user }) => {
        // if (!user.length) {
        // 	throw new Error("Token must be provided");
        // }
        return {
          items: Models.Story.find({})
            .skip(skip)
            .limit(first),
          count: Models.Story.count()
        };
      }
    },
    authors: {
      type: Paging.pagingType({ name: "Author", schema: AuthorSchema }),
      args: Paging.pagingArg,
      resolve(parent, { first = null, skip = null }, { Models, user }) {
        // if (!user.length) {
        // 	throw new Error("Token must be provided");
        // }
        return {
          items: Models.Author.find({})
            .skip(skip)
            .limit(first),
          count: Models.Author.count()
        };
      }
    },
    categories: {
      type: new GraphQLList(CategorySchema),
      resolve(parent, args, { Models, user }) {
        // if (!user.length) {
        // 	throw new Error("Token must be provided");
        // }
        return Models.Category.find({});
      }
    }
    // categories: {
    // 	type: new GraphQLList(),
    // 	resolve(parent, args) {
    // 		return ["a", "b", "c"];
    // 	}
    // }
  }
};

module.exports = RootQueries;
