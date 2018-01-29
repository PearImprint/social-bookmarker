// Separation of concerns: contentscript.js is just an interface to the html on the webpage. no logic here.
console.log("running content script");
// debugging: this code prints in the regular webpage console.
chrome.extension.sendMessage({}, function(response) {
  console.log(response);
  if (response.emails.length > 0) {
    console.log("response.emails is", response.emails);
    profile_user = response.emails[0].split('@')[0];
    console.log("Got profile user:", profile_user);
  } else {
    console.log("Couldn't get email address of chrome user.");
  }
});

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("received a request");
		console.log(request);
		if (request.message == "getTitle") {
			console.log("received a request for page title, responding1.");
			sendResponse({message: document.title});
		}
	}
);