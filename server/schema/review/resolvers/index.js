const Story = require("../../../models/Story");
const Author = require("../../../models/Author");
const Review = require("../../../models/Review");

module.exports = {
  getReviews: (parent, args) => {
    return Review.find({ storyId: parent.id });
  },
  getReview: id => {
    return Review.findById(id);
  },
  addReview: (parent, args, user) => {
    let review = new Review({
      rating: args.rating,
      comment: args.comment,
      userId: user.id,
      storyId: args.storyId
    });

    return review.save();
  }
};
