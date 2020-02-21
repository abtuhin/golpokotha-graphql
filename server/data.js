var stories = [
	{
		title: "Name of the Wind",
		views: 120,
		loved: 220,
		trending: false,
		pdf: "http://test.pdf",
		category: "Fantasy",
		id: "1",
		authorId: "1"
	},
	{
		title: "The Final Empire",
		views: 120,
		loved: 220,
		trending: false,
		pdf: "http://test.pdf",
		category: "Fantasy",
		id: "2",
		authorId: "2"
	},
	{
		title: "The Hero of Ages",
		views: 120,
		loved: 220,
		trending: false,
		pdf: "http://test.pdf",
		category: "Fantasy",
		id: "4",
		authorId: "2"
	},
	{
		title: "The Long Earth",
		views: 120,
		loved: 220,
		trending: false,
		pdf: "http://test.pdf",
		category: "Sci-Fi",
		id: "3",
		authorId: "3"
	},
	{
		title: "The Colour of Magic",
		views: 120,
		loved: 220,
		trending: false,
		pdf: "http://test.pdf",
		category: "Fantasy",
		id: "5",
		authorId: "3"
	},
	{
		title: "The Light Fantastic",
		views: 120,
		loved: 220,
		trending: false,
		pdf: "http://test.pdf",
		category: "Fantasy",
		id: "6",
		authorId: "3"
	}
];

var authors = [
	{ name: "Patrick Rothfuss", age: 44, id: "1" },
	{ name: "Brandon Sanderson", age: 42, id: "2" },
	{ name: "Terry Pratchett", age: 66, id: "3" }
];

var reviews = [
	{ id: "1", rating: 3.5, comment: "mod khaba naki?", authorId: "2", storyId: "3" },
	{ id: "2", rating: 2.5, comment: "mod khaba naki?", authorId: "2", storyId: "1" },
	{ id: "3", rating: 4.5, comment: "mod khaba naki?", authorId: "3", storyId: "2" },
	{ id: "4", rating: 1.5, comment: "mod khaba naki?", authorId: "3", storyId: "2" },
	{ id: "5", rating: 5, comment: "mod khaba naki?", authorId: "2", storyId: "1" }
];

module.exports = {
	stories: stories,
	authors: authors,
	reviews: reviews
};
