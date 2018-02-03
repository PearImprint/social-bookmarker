"use strict";

var mongoose = require('mongoose');
var models = require('./schemas/models');

var getCommunities = function(req) {

}

var createUser = function(req) {
	mongoose.model("User").findOne({"google_id": req.body.google_id}, function(error, exist) {
		if (exist && !error) {
			console.log("user already exists. no action taken.");
		} else {
			var newUser = new models.User({
				google_id: req.body.google_id,
				email: req.body.email,
				username: req.body.username
			});
			newUser.save(function(error, users) {
				console.log(error);
			});
		}
	});
}

module.exports = {
	createUser: createUser
}