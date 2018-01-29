// Separation of concerns: contentscript.js is just an interface to the html on the webpage. no logic here.

// debugging: this code prints in the regular webpage console.
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log("received a request");
		console.log(request);
		if (request.message == "getTitle") {
			console.log("received a request for page title, responding.");
			sendResponse({message: document.title});
		}
	}
);

function addStyleString(str) {
	let rhs = document.getElementById("rhs_block");

	// I REPEAT: DO NOT SHIP WITH THIS LOL
	// brb shipping with this  
	// this is a security flaw - pls fix lol 
	imprint = {title: "How to be friends with Pusheen", link_title: "Keeping up with Pusheen", link: "https://twitter.com/Pusheen", upvotes: 5}
	const markup = `
	  <div class="imprint_container">
		  <div class="imprint_card_title">
		    <p>
		        ${imprint.title}
		    </p>
		  </div>
		  <div class="imprint_card_body">
			<a href=${imprint.link} class="imprint_card_link_titles">${imprint.link_title}</a>
		  	</br>
		    <span class="imprint_card_links">${imprint.link}</span>
		    <p class="imprint_card_upvotes">${imprint.upvotes} others love this imprint</p>
		  </div>
	  </div>
	`;
	rhs.innerHTML = markup; 
    var node = document.createElement('style');
    node.innerHTML = str;
    rhs.appendChild(node);
}

cardStyle = `
	.imprint_container {
		border: 1px solid #e0e0e0;
		border-radius: 4px; 
	}
	.imprint_card_title {
		font-size: 30px;
		font-weight: 400; 
		border-bottom: 1px solid #e0e0e0;
		padding: 10px 20px 10px 20px; 
	}
	.imprint_card_body {
		padding: 10px; 
		padding-left: 20px; 
	}
	.imprint_card_link_titles {
		color: #1a0dab;
		font-size: 20px; 
	}
	.imprint_card_links {
		color: #7c7c7c;
		font-size: 15px; 
	}
	.imprint_card_upvotes {
		font-size: 15px;
		color: #2eb24b;
	}
`;

addStyleString(cardStyle);
