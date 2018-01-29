"use strict";

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

var userSchema = new mongoose.Schema({
	username: {type: String, required: true},
	email: {type: String, required: true}, 
    google_id: {type: String, required: true}, 
    imprints: {type: [ObjectId]},  			
    communities: {type: [ObjectId]},  
    friends: {type: [ObjectId]}
});

var imprintSchema = new mongoose.Schema({
	title: {type: String, required: true},
	selected_texts: {type: [String]},  
	selected_images: {type: [String]},  
	upvotes: {type: Number, required: true, default: 0},
	downvotes: {type: Number, required: true, default: 0}
});

var communitySchema = new mongoose.Schema({
	name: {type: String, required: true}, 
	users: {type: [ObjectId]}, 
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