function getLinks(comments) {
	if(typeof(comments)==='undefined') comments = true;

	var data = Array();

	var ele = document;
	var entries = ele.querySelectorAll('#siteTable .entry, #siteTable_organic .entry');
	for (var i = 0, len = entries.length; i < len; i++) {
		if (typeof entries[i] !== 'undefined') {
			var thisLA = entries[i].querySelector('A.title');
			if (thisLA !== null) {
				var thisLink = thisLA.href;
				var thisUL = entries[i].querySelector('ul.flat-list');

				if (typeof thisLink == 'undefined') {
					continue;
				}

				data.push(thisLink);

				if (comments) {
					var thisComments = (thisComments = entries[i].querySelector('.comments')) && thisComments.innerHTML != "comment" && thisComments.href;
					if(thisComments && thisComments != thisLink) {
						data.push(thisComments);
					}
				}
			}
		}
	}

	return data;
}

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	switch (request.action) {
		case 'openRedditLinks':
			var data = getLinks(false);

			if(data.length > 0) {
				callback({
					urls: data
				});
			}
			break;

		case 'openRedditLinksComments':
			var data = getLinks(true);

			if(data.length > 0) {
				callback({
					urls: data
				});
			}
			break;

		default:
			break;
	}
});
