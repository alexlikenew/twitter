
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var User = new Schema({
	id: String,
	username: String,
	password: String,
	emailAddress: String,
	firstName: String,
	lastName: String,
	country:String,
	aboutMe:String,
	favourite: Array,
	following:Array
});

module.exports = mongoose.model('User', User);
