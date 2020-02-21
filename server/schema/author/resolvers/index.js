const Story = require("../../../models/Story");
const Author = require("../../../models/Author");
const Review = require("../../../models/Review");

module.exports = {
  getAuthor: id => {
    return Author.findById(id);
  },
  getAuthorStories: (parent, args) => {
    return Story.find({ authorId: parent.id });
  },
  getAuthorReviews: (parent, args) => {
    return Review.find({ authorId: parent.id });
  },
  addAuthor: (parent, args, user) => {
    let author = new Author({
      name: args.name,
      age: args.age,
      fbId: user.userId
    });
    return author.save();
  }
};
