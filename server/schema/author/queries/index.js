const graphql = require("graphql");
const _ = require("lodash");
const AuthorSchema = require("../types");
const { authors } = require("../../../data.js");
const { GraphQLID } = graphql;
const AuthorResolver = require("../resolvers");

const author = {
	type: AuthorSchema,
	args: { id: { type: GraphQLID } },
	resolve(parent, args) {
		return AuthorResolver.getAuthor(args.id);
	}
};

module.exports = {
	authorQuery: author
};
