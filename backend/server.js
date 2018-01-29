// debugging: this code prints in the local host terminal window.
"use strict"

var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());

var models = require('./schemas/models');

const DATABASE_NAME = "data";
const MONGO_URL = `mongodb://localhost:27017/{DATABASE_NAME}`;

mongoose.connect(process.env.MONGODB_URI || MONGO_URL); // questionable.

var server = app.listen(process.env.PORT || 3000, function() {
	var port = server.address().port;
	console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});

app.post('/save', function(req, res) {
	console.log('received POST');
	console.log(req.body);
	if (req.body.type == "imprint") {
		console.log("generating imprint entry");
		// var newImprint = new models.Imprint({
		// 	title: req.body.title,
		// 	user: req.body.user
		// });
		mongoose.model('Imprint').findOne({'url': req.body.url}, function(error, exist) {
			if (exist && !error) {
				console.log('exists')
				console.log(exist)
				if (req.body.vote == 1) {
					const index = exist.downvoted_users.indexOf(eq.body.user_id);
				    if (index !== -1) {
				        exist.downvoted_users.splice(index, 1);
				    }
					exist.upvoted_users.push(req.body.user_id);
				} else {
					const index = exist.upvoted_users.indexOf(req.body.user_id);
				    if (index !== -1) {
				        exist.upvoted_users.splice(index, 1);
				    }
					exist.downvoted_users.push(req.body.user_id);
				}
				exist.save();
			} else {
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
					console.log(newImprint)
					newImprint.save(function(error, user) {
						console.log(error)
					});
				}
				console.log("new!")
			}
		})
	}
	res.status(200).send('sent successfully');
});

function remove(array, element) {
    const index = array.indexOf(element);
    
}