const Story = require("../../../models/Story");
const Author = require("../../../models/Author");
const Review = require("../../../models/Review");
const Category = require("../../../models/Category");
const { generatePdf } = require("../../../libs/makepdf");

const _calculateAge = birthday => {
  var ageDifMs = Date.now() - birthday.getTime();
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

module.exports = {
  getStory: id => {
    return Story.findById(id);
  },
  addStory: async (parent, args, user) => {
    console.log("=========", JSON.parse(args.pdf));
    let data = await Author.findOne({ fbId: user.userId });
    if (data) {
      let story = new Story({
        title: args.title,
        category: args.category,
        trending: args.trending,
        pdf: generatePdf(args.title, JSON.parse(args.pdf)),
        authorId: data.id,
        imageUrl: args.imageUrl
      });
      return story.save();
    } else {
      let author = new Author({
        name: user.name,
        age: _calculateAge(user.dateOfBirth),
        fbId: user.userId,
        profileImage: user.profileImage
      });
      let response = await author.save();
      let story = new Story({
        title: args.title,
        category: args.category,
        trending: args.trending,
        pdf: generatePdf(args.title, JSON.parse(args.pdf)),
        authorId: response.id,
        imageUrl: args.imageUrl
      });
      return story.save();
    }
  },
  incrementStoryView: async (parent, args) => {
    let story = await Story.findById(args.id);
    return Story.findOneAndUpdate({ _id: args.id }, { views: story.views + 1 });
  },
  incrementStoryLove: async (parent, args) => {
    let story = await Story.findById(args.id);
    return Story.findOneAndUpdate({ _id: args.id }, { loved: story.loved + 1 });
  }
};
