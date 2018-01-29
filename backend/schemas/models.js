"use strict";

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	email: {type: String, required: true}, 
    google_id: {type: String, required: true}, 
    imprints: {type: [ObjectId]},  			
    communities: {type: [ObjectId]},  
    friends: {type: [String]}
});

var imprintSchema = new mongoose.Schema({
	title: {type: String, required: true},
	url: {type: String, required: true},
	selected_texts: {type: [String]},  
	selected_images: {type: [String]},  
	// users by google id
	upvoted_users: {type: [String], required: true, default: []},
	downvoted_users: {type: [String], required: true, default: []}
});

var communitySchema = new mongoose.Schema({
	name: {type: String, required: true}, 
	users: {type: [String]}, 
	imprints: {type: [ObjectId]} 
});

var User = mongoose.model('User', userSchema);
var Imprint = mongoose.model('Imprint', imprintSchema);
var Community = mongoose.model('Community', communitySchema);

module.exports = {
	User: User,
	Imprint: Imprint,
	Community: Community
};