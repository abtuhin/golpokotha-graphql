const graphql = require("graphql");
const _ = require("lodash");
const CategorySchema = require("../types");
const { GraphQLID } = graphql;
const CategoryResolver = require("../resolvers");

const category = {
	type: CategorySchema,
	args: { id: { type: GraphQLID } },
	resolve(parent, args) {
		return CategoryResolver.getCategory(args.id);
	}
};

module.exports = {
	categoryQuery: category
};
