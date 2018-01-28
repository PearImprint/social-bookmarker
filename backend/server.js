// debugging: this code prints in the local host terminal window.
"use strict"

var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(express.static(__dirname));
app.use(bodyParser.json());

var Bookmark = require('./schemas/bookmark');

const DATABASE_NAME = "data";
const MONGO_URL = `mongodb://localhost:27017/{DATABASE_NAME}`;

mongoose.connect(process.env.MONGODB_URI || MONGO_URL); // questionable.

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});

app.post('/save', function(req, res) {
	console.log('received POST');
	//console.log(req);
	console.log(req.body); // nothing is being received.
	if (req.body.type == "bookmark") {
		console.log("generating bookmark entry");
		var newBookmark = new Bookmark({
			title: req.body.title,
			user: req.body.user
		});
		newBookmark.save();
		console.log(newBookmark);
	}
	res.status(200).send('sent successfully');
});