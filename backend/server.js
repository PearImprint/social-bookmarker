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
const MONGO_URL = "mongodb://localhost:27017/data";

mongoose.connect(MONGO_URL); // questionable.

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});

app.post('/save', function(req, res) {
	console.log('received POST');
	console.log(req.body);
	if (req.body.type == "imprint") {
		console.log("generating imprint entry");
		var newImprint = new Imprint({
			title: req.body.title,
			user: req.body.user
		});
		newImprint.save();
		console.log(newImprint);
	}
	res.status(200).send('sent successfully');
});