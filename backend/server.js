// debugging: this code prints in the local host terminal window.
"use strict";

var mongoose = require("mongoose");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());

var models = require("./schemas/models");
var user = require("./user")

const DATABASE_NAME = "data";
const MONGO_URL = "mongodb://localhost:27017/" + DATABASE_NAME;

mongoose.connect(process.env.MONGODB_URI || MONGO_URL); // questionable.

var server = app.listen(process.env.PORT || 3000, function() {
	var port = server.address().port;
	console.log("Listening at http://localhost:" + port + " exporting the directory " + __dirname);
});

// Any data that is saved? 
// TODO: reorganize server side code around which schemas are being called.
app.post("/save", function(req, res) {
	console.log("received POST request to /save");
	console.log(req.body);
	if (req.body.type == "imprint") {
		console.log("saving imprint entry");
		mongoose.model("Imprint").findOne({"url": req.body.url}, function(error, exist) {
			if (exist && !error) {
				console.log("exists")
				updateVotes(exist, req.body.user_id, req.body.vote)
				console.log(exist)
			} else { // TODO: someone decompose this please
				if (req.body.vote == 1) {
					var newImprint = new models.Imprint({
						title: req.body.title,
						url: req.body.url,
						upvoted_users: [req.body.user_id]
					});
					console.log(newImprint)
					newImprint.save(function(error, user) {
						console.log(error)
					});
				} else {
					var newImprint = new models.Imprint({
						title: req.body.title,
						url: req.body.url,
						downvoted_users: [req.body.user_id]
					});
					console.log(newImprint);
					newImprint.save(function(error, imprint) {
						console.log(error);
					});
				}
			}
		});
	} else if (req.body.type = "community") {
		console.log("saving community entry");
		mongoose.model("Community").findOne({"name":req.body.name, "google_id":req.body.google_id}, function(error, exist) {
			var communityId = "error"; // #sketchyaf #shadesofclaire
			if (exist && !error) { // if entry already exists (this should probably be blocked on frontend)
				console.log("community " + req.body.name + " already exists. Not creating new community.");
				console.log("new community object id: " + exist.ObjectId)
			} else {
				var newCommunity = new models.Community({
					name: req.body.name,
					users: [req.body.google_id],
					imprints: []
				});
				console.log(newCommunity);
				console.log("new community object id: " + newCommunity.ObjectId)
				newCommunity.save(function(error, community) {
					console.log(error);
				});
			}
			if(communityId = "error") {
				console.log("nope bad things are going to happen");
			}
			mongoose.model("User").findOne({"google_id":req.body.google_id}, function(error, exist) {
				if (exist && !error) {
					const existingCommunities = exist.communities;
					if (exist.communities.includes(req.body.google_id)) {
						console.log("user is already in community with ID " + communityId + ". taking no action.");
					} else {
						exist.communties.push(communityId);
						console.log("user added to community with ID " + communityId + ".");
					}
				} else {
					console.log("ERROR: user does not exist, but should. check signin process.");
				}
			});
		});
	} else {
		console.log("you fucked up");
	}
	res.status(200).send("sent successfully");
});

// anything that accesses user data here
app.post("/user", function(req, res) {
	console.log("received GET request to /user");
	const requestType = req.body.type;
	switch (requestType) {
		case "createUser":
			console.log("createUser switch");
			user.createUser(req);
			break;
		default:
			console.log("unknown request type");
	}
	res.status(200).send("whatever we're not using this anyways");
});

// TODO: change to allow undoing of upvotes
function updateVotes(exist, user_id, vote) {
	const upIndex = exist.upvoted_users.indexOf(user_id);
	const downIndex = exist.downvoted_users.indexOf(user_id);
	if (vote === 1) {										// if user upvotes
	    if (downIndex !== -1) { 							// if user downvoted before, remove them from downvotes
	        exist.downvoted_users.splice(downIndex, 1);
	    }
	    if (upIndex !== -1) {								// if user has upvoted before, remove them from upvotes
	    	exist.upvoted_users.splice(upIndex,1);
	    } else {
			exist.upvoted_users.push(user_id);				// if user has not upvoted before, add them to upvoted users
	    }
	} else {
	    if (upIndex !== -1) {
	        exist.upvoted_users.splice(upIndex, 1);
	    }
	    if (downIndex !== -1){
	    	exist.downvoted_users.splice(downIndex, 1);
	    } else {
			exist.downvoted_users.push(user_id);
	    }
	}
	exist.save();
}