chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message == "getTitle") {
			console.log("received a request for page title, responding.");
			sendResponse({message: document.title});
		}
	}
);