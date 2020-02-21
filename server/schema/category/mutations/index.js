const graphql = require("graphql");
const _ = require("lodash");
const StorySchema = require("../types");
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean } = graphql;
const CategoryResolver = require("../resolvers");

const addCategory = {
	type: StorySchema,
	args: {
		name: { type: GraphQLString }
	},
	resolve(parent, args) {
		return CategoryResolver.addCategory(parent, args);
	}
};

module.exports = {
	addCategory: addCategory
};
