// function openAllUrls(tab) {
// 	chrome.tabs.sendRequest(tab.id, {
// 		action : 'openRedditLinks',
// 		tabid : tab.id
// 	}, function(response) {
// 		openUrl(response.urls, 0, 0, response.tabid);
// 	});
// }

function openUrls(urls) {
	for(var i = 0; i <= urls.length; i++) {
		var targetUrl = urls[i];
		console.log("url " + targetUrl);

		chrome.tabs.create({
						url: targetUrl,
						selected : false
					});

		continue;
		chrome.history.getVisits({
	 		url: targetUrl
			}, function(visitItems) {
				if(visitItems.length == 0) {
					chrome.tabs.create({
						url: targetUrl,
						selected : false
					});
				}
			}
		);
	}
}

// // function init() {
// // }

// // document.addEventListener('DOMContentLoaded', function () {
// //   init();
// // });

chrome.contextMenus.create({
    "title": "Open links",
    "contexts": ["page"],
    "onclick" : function(request, tab) {
		chrome.tabs.sendMessage(tab.id, {
			action : 'openRedditLinks',
			tabid : tab.id
		}, function(response) {
			openUrls(response.urls);
		});
    }
  }
);

chrome.contextMenus.create({
    "title": "Open links/comments",
    "contexts": ["page"],
    "onclick" : function(request, tab) {
		chrome.tabs.sendMessage(tab.id, {
			action : 'openRedditLinksComments',
			tabid : tab.id
		}, function(response) {
			openUrls(response.urls);
		});
    }
  }
);
