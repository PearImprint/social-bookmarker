// Separation of concerns: contentscript.js is just an interface to the html on the webpage. no logic here.
// debugging: this code prints in the regular webpage console.
console.log("Running Content Script")

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("received a request");
		if (request.message == "getTitle") {
			console.log("received a request for page title, responding.");
			sendResponse({title: document.title});
		} else {
			console.log("Wrong");
		}
	}
);