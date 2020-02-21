const graphql = require("graphql");
const UserSchema = require("../types");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLBoolean
} = graphql;

const addUser = {
  type: UserSchema,
  args: {
    userId: { type: GraphQLString },
    name: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
    profileImage: { type: GraphQLString },
    gender: { type: GraphQLString },
    token: { type: GraphQLString }
  },
  resolve(parent, args, { Models, user }) {
    return Models.User.findOne({ userId: args.userId }).then(async user => {
      if (user) {
        return Models.User.findOneAndUpdate(
          { userId: args.userId },
          { token: args.token }
        );
      } else {
        let user = new Models.User({
          userId: args.userId,
          name: args.name,
          dateOfBirth: new Date(args.dateOfBirth).toISOString(),
          profileImage: args.profileImage,
          gender: args.gender,
          token: args.token
        });
        return user.save();
      }
    });

    // return AuthorResolver.addAuthor(parent, args, user);
  }
};

module.exports = {
  addUser: addUser
};
