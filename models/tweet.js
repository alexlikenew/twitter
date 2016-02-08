var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var tweet = new Schema({


   header: String,
    username: String,
   tweet: String,
   tags:String,
    reply:String,
    author:String,
    date: { type: Date }



} ,{ collection: 'tweets' });


module.exports = mongoose.model('Tweet', tweet);
