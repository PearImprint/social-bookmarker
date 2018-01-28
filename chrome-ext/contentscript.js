// Separation of concerns: contentscript.js is just an interface to the html on the webpage. no logic here.

// debugging: this code prints in the regular webpage console.

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("received a request");
		console.log(request);
		document.getElementById("rhs").innerHTML = "";
		if (request.message == "getTitle") {
			console.log("received a request for page title, responding.");
			sendResponse({message: document.title});
			chrome.identity.getProfile
		}
	}
);