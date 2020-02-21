const graphql = require("graphql");
const _ = require("lodash");

const RootQueries = require("./root/types");
const RootMutations = require("./root/mutations");

const { GraphQLSchema, GraphQLObjectType } = graphql;

const RootQuery = new GraphQLObjectType(RootQueries);

const Mutation = new GraphQLObjectType(RootMutations);

module.exports = new GraphQLSchema({
	query: RootQuery,
	mutation: Mutation
});
