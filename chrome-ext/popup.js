// separation of concerns: popup.js handles all logic, requests document data from contentscript.js when needed
// debugging: this code prints in the inspect element of the popup.

var USER_ID;
const ROOT_URL = 'http://localhost:3000/';

function getRandomToken() {
    // E.g. 8 * 32 = 256 bits token
    var randomPool = new Uint8Array(32);
    crypto.getRandomValues(randomPool);
    var hex = '';
    for (var i = 0; i < randomPool.length; ++i) {
        hex += randomPool[i].toString(16);
    }
    // E.g. db18458e2782b2b77e36769c569e263a53885a9944dd0a861e5064eac16f1a
    return hex;
}

function serialize(obj) {
  var str = [];
  for(var p in obj)
     str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  return str.join("&");
}

function post(path, params, method) { // should be able to use FormData for this but doesn't work :(

    method = method || 'POST'; // Set method to post by default if not specified.

    var request = new XMLHttpRequest();
    request.open(method, ROOT_URL + path, true);
    //request.setRequestHeader("Content-Type", "application/json"); // idk if this is supposed to be here or not
    request.send(params); // this is posting an empty json
    console.log(params);
};

function setUserId() {
	chrome.storage.sync.get('userid', function(items) {
	    if (items.userid) {
	        USER_ID = items.userid;
	    } else {
	        USER_ID = getRandomToken();
	        chrome.storage.sync.set({userid: userid}, function() {
	            console.log('new id saved');
	        });
	    }
	});
}

function saveBookmark() { // TODO: request other data from page.
	console.log('save bookmark clicked');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: 'getTitle'}, function(response) {
			console.log('title found was: ' + response.message);
			console.log('id for user is: ' + USER_ID);
			const data = {'title': response.message, 'user': USER_ID, 'type': 'bookmark'};
			post('save', data);
		});
	});
}

// Everything in here runs on page load
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('bookmark').addEventListener('click', saveBookmark);
	setUserId();
});