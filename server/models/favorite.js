var constants = require('../constants');
var mongoose = require('mongoose');
mongoose.connect(constants.MLAB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db connected');
});

/*
{
	"url": "https://youtu.be/eM31pqYXSIM",
	"title": "Angular 2  tutoriel 8  en français : @Output decorator et EventEmitter",
  "description": "bla bla",
  "userDescription": "cool cette video"
	"category": "programmation",
	"channelTitle": "codeconcept",
	"chanelId": "UCY_guo_AYBs0cIkeMVc16iw",
	"thumbnailDefaultUrl": "https://i.ytimg.com/vi/eM31pqYXSIM/default.jpg",
	"channelUrl": "https://www.youtube.com/channel/UCY_guo_AYBs0cIkeMVc16iw",
  "videoId": "pU9Q6oiQNd0",
	"duration": "592",
	"durationUnit": "secondes",
	"publishedAt": "2017-01-16T22:28:26.000Z",
	"addedToFavoriteDate": "2017-01-27T08:01:12.000Z"
}
*/

var favoriteSchema = mongoose.Schema({
  url: String,
  title: String,
  description: String,
  userDescription: String,
  category: String,
  channelTitle: String,
  chanelId: String,
  thumbnailDefaultUrl: String,
  channelUrl: String,
  videoId: String,
  duration: String,
  durationUnit: String,
  publishedAt: String,
  addedToFavoriteDate: String
});
exports.Favorite = mongoose.model('Favorite', favoriteSchema)