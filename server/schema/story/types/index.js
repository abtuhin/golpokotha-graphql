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
const AuthorResolver = require("../../author/resolvers");
const ReviewResolver = require("../../review/resolvers");
const StoryResolver = require("../../story/resolvers");
const CategoryResolver = require("../../category/resolvers");
const Paging = require("../../paging");
const ReviewSchema = require("../../review/types");

const StorySchema = new GraphQLObjectType({
  name: "Story",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    views: { type: GraphQLInt },
    loved: { type: GraphQLInt },
    trending: { type: GraphQLBoolean },
    pdf: { type: GraphQLString },
    imageUrl: { type: GraphQLString },
    author: {
      type: require("../../author/types"), // to avoid circular dependency
      resolve(parent, args) {
        return AuthorResolver.getAuthor(parent.authorId);
      }
    },
    reviews: {
      /**
			 this pagination on nested array is for testng, have use mongo aggregate in future
			*/
      // type: Paging.pagingType({
      //   name: "Reviews",
      //   schema: require("../../review/types")
      // }),
      // args: Paging.pagingArg,
      type: new GraphQLList(require("../../review/types")),
      resolve(parent, args, { Models }) {
        return ReviewResolver.getReviews(parent, args);
      }
    },
    categories: {
      type: new GraphQLList(require("../../category/types")),
      resolve(parent, args, { Models }) {
        return Models.Category.find({ _id: { $in: parent.category } });
      }
    },
    user: {
      type: require("../../user/types"), // to avoid circular dependency
      resolve(parent, args, { Models, user }) {
        // return Models.Author.findById(parent.authorId).then(async author => {
        //   if (author) {
        //     let user = await Models.User.findOne({ userId: author.fbId });
        //     return {
        //       name: user.name,
        //       fbId: author.fbId
        //     };
        //   }
        //   return null;
        // });

        return user;
      }
    }
  })
});

module.exports = StorySchema;
