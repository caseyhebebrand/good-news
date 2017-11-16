const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/getter')

let mediaSchema = mongoose.Schema({
  type: String,
  url: String,
  format: String,
  contentLength: Number,
  width: Number,
  height: Number
});

let articleSchema = mongoose.Schema({
  id: Number,
  title: String,
  links: {
    coverages: String,
    permalink: String,
    relatedStories: String,
  },
  summary: {
    sentences: [String]
  },
  media: [ mediaSchema ],
  views: Number
});



let Article = mongoose.model('Article', articleSchema);

let find = (options) => {
  return Article.find(options);
}

let save = (articleItems) => {
  return new Article(articleItems).save((err, data) => {
    if (err) { console.log(err)}
  });
}

let updateViews = (options) => {
  return Article.update(options, { $inc: {views: 1} });
}

let findAll = () => {
  return Article.find().limit(25).sort({views: -1})
}

module.exports.updateViews = updateViews;
module.exports.save = save;
module.exports.find = find;
module.exports.findAll = findAll;
