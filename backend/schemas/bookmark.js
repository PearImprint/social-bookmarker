"use strict";

var mongoose = require('mongoose');

// create a schema for Judge
var bookmarkSchema = new mongoose.Schema({
    title: {type: String, required: true}, // Judge name
    user: {type: String, required: true}, // phone number
});

var Bookmark = mongoose.model('Bookmark', bookmarkSchema);

module.exports = Bookmark;