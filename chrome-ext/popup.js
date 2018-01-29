// separation of concerns: popup.js handles all logic, requests document data from contentscript.js when needed
// debugging: this code prints in the inspect element of the popup.

const IS_LOCAL = false;

var USER_ID;
const ROOT_URL = 'http://localhost:3000/';

function post(path, params, method) { // should be able to use FormData for this but doesn't work :(

    method = method || 'POST'; // Set method to post by default if not specified.

    var request = new XMLHttpRequest();
    if (IS_LOCAL) {
        request.open(method, 'http://localhost:3000/save', true);
    } else {
        console.log("making heroku request");
        request.open(method, 'http://pear-imprint.herokuapp.com/save', true);
    }

    request.setRequestHeader("Content-type", "application/json");
    console.log(method);
    console.log(ROOT_URL + path);
    console.log(JSON.stringify(params));

    request.send(JSON.stringify(params)); // this is posting an empty json

    request.onreadystatechange = function() { //Call a function when the state changes.
        if (request.readyState == XMLHttpRequest.DONE && request.status == 200) {
            console.log('tings finished');
        }
    }
};

function saveImprint() { // TODO: request other data from page.
	console.log('save imprint clicked');
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.extension.sendMessage({}, function(response) {
            USER_ID = response.id;
            chrome.tabs.sendMessage(tabs[0].id, {message: 'getTitle'}, function(response) {
                console.log('title found was: ' + response.title);
                console.log('id for user is: ' + USER_ID);
                const data = {'title': response.title, 'user': USER_ID, 'type': 'imprint'};
                post('save', data);
            });
        })
	});
}

// Everything in here runs on page load
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('imprint').addEventListener('click', saveImprint);
});