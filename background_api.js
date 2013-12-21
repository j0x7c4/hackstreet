chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if ( request.method == "setlocation" ) {
			data = request.data;
			storage = window.localStorage;
			storage.setItem("location",JSON.stringify(data));	
			sendResponse({setLocation: "ok"});
		}		
});