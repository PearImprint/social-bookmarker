function saveBookmark() { // TODO: request other data from page.
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {message: "getTitle"}, function(response) {
			console.log("title found was: " + response.message); // TODO: this response to database.
		});
	});
}

// Everything in here runs on page load
document.addEventListener('DOMContentLoaded', function() {
	document.getElementById('bookmark').addEventListener('click', saveBookmark);
});