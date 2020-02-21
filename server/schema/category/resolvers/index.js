const Category = require("../../../models/Category");
const Story = require("../../../models/Story");

module.exports = {
	addCategory: (parent, args) => {
		let category = new Category({
			name: args.name
		});

		return category.save();
	},
	getCategory: id => {
		return Category.findById(id);
	}
};
