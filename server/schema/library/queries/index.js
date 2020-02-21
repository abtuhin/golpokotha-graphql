const graphql = require("graphql");
const _ = require("lodash");
const LibrarySchema = require("../types");
const { authors } = require("../../../data.js");
const { GraphQLID } = graphql;

const libraryQuery = {
  type: LibrarySchema,
  resolve(parent, args, { Models, user }) {
    return Models.Library.findOne({ user: user.id });
  }
};

module.exports = {
  libraryQuery: libraryQuery
};
