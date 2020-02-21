const graphql = require("graphql");
const _ = require("lodash");
const ReviewSchema = require("../types");
const { reviews } = require("../../../data.js");
const { GraphQLID } = graphql;
const ReviewResolver = require("../resolvers");

const review = {
	type: ReviewSchema,
	args: { id: { type: GraphQLID } },
	resolve(parent, args) {
		return ReviewResolver.getReview(args.id);
	}
};

module.exports = {
	reviewQuery: review
};
