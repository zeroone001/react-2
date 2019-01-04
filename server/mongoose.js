const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/smzdm_index", {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('we are connected!');
});
var listData = new mongoose.Schema({
	time_sort: Number,
  article_pic: String,
  article_title: String,
  article_price: String,
  article_mall: String,
  article_format_date: String
}, {
	collection: "listData"
});

var swiperImg = new mongoose.Schema({
	imgUrls: [String]
}, {
	collection: "swiperImg"
});



var listModel = mongoose.model('listData', listData, 'listData');
var swiperModel = mongoose.model('swiperImg', swiperImg, 'swiperImg');

module.exports = {
	listModel,
	swiperModel
};
