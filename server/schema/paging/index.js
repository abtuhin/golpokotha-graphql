const graphql = require("graphql");
const { GraphQLInt, GraphQLList, GraphQLObjectType } = graphql;

module.exports = {
	pagingArg: {
		first: {
			name: "first",
			type: GraphQLInt
		},
		skip: {
			name: "skip",
			type: GraphQLInt
		}
	},
	pagingType: ({ name, schema }) => {
		return new GraphQLObjectType({
			name: name + "List",
			fields: {
				items: { type: new GraphQLList(schema) },
				count: { type: GraphQLInt }
			}
		});
	}
};
